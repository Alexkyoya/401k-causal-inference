# Does offering a 401(k) make people save more?

A causal inference case study on 9,915 U.S. households using **CausalML** and **DoWhy**.

**[Read the full case study →]([your website URL])**

Households eligible for a 401(k) hold **$19,559** more in net financial assets than ineligible ones. But eligible workers also earn about $15,400 more per year, own homes more often and are more likely to have a pension. This project estimates how much of that gap is actually *caused* by 401(k) eligibility.

## Key findings

| Question | Method | Estimate |
|---|---|---|
| Raw gap (no adjustment) | Difference in means | $19,559 |
| Effect of **eligibility** | CausalML S-learner (linear) | $5,896 (95% CI $2,909 to $8,883) |
| | CausalML T-learner (XGBoost) | $8,215 (95% CI $6,868 to $9,563) |
| | DoWhy backdoor linear regression | $5,896 |
| | DoWhy propensity score weighting | $4,065 |
| Effect of **participation** | Plain backdoor regression (biased upward) | $11,601 |
| | Instrumental variable with controls | **$8,502** |

- **More than half of the raw gap is confounding.** After adjusting for nine household characteristics, eligibility raises net financial assets by about $4,100 to $8,200.
- **The benefit is concentrated among higher earners.** The top income quintile gains about $20,100; the other quintiles gain between under $1,000 and about $10,400. Income explains 48% of the variation in the effect.
- **The estimate is robust.** It survives three DoWhy refutation tests: a random common cause ($5,896 → $5,896), a placebo treatment ($5,896 → $68) and random 80% subsets ($5,896 → $5,953).
- **Participating is worth about $8,500** for households who join because they are eligible, using eligibility as an instrument. The plain regression ($11,601) overstates it because motivated savers self-select into plans.

## Methods

1. **Causal setup:** treatment `e401` (eligibility), outcome `net_tfa` (net total financial assets), controls `age, inc, educ, fsize, marr, twoearn, db, pira, hown`.
2. **CausalML:** `LRSRegressor` (S-learner) and `XGBTRegressor` (T-learner) for the average treatment effect; individual effects grouped by income quintile; feature importance on predicted effects.
3. **DoWhy:** causal graph, backdoor identification, linear regression and inverse propensity weighting, three refutation tests.
4. **Instrumental variables:** `e401` as an instrument for participation `p401`, adjusted for controls (reduced form ÷ first stage).

## Repository structure

```
├── Assignment2_401k.ipynb   # full analysis with explanations
├── 401k.csv                 # dataset (9,915 households, 14 variables)
├── requirements.txt         # pinned package versions
├── docs/
│   └── index.html           # case study web page (GitHub Pages)
└── README.md
```

## How to run

Use Python 3.11 (CausalML does not yet build on newer versions).

```bash
conda create -n causal python=3.11
conda activate causal
pip install -r requirements.txt
jupyter notebook Assignment2_401k.ipynb
```

`requirements.txt`:

```
causalml==0.17.0
dowhy==0.14
pandas==2.3.3
networkx==3.4.2
xgboost
matplotlib
numpy
ipykernel
```

The version pins matter: `networkx` 3.5+ removed a function DoWhy relies on, and older DoWhy releases fail with pandas 3.

## Limitations

- Observational data: results are causal only if the nine controls capture all common causes of eligibility and saving.
- Net financial assets are highly skewed; a few very wealthy households can move averages.
- DoWhy estimates assume linear relationships.
- The IV estimate is a local effect for compliers and has no confidence interval here.
- Data are from 1991.

## Data and references

- 401(k) data from the 1991 Survey of Income and Program Participation, as used in Chernozhukov, V. et al. (2018). *Double/debiased machine learning for treatment and structural parameters.* The Econometrics Journal.
- Poterba, J., Venti, S. and Wise, D. (1994). *401(k) plans and tax-deferred saving.*
- [CausalML documentation](https://causalml.readthedocs.io) · [DoWhy documentation](https://www.pywhy.org/dowhy)

---

Course project for McGill University MMA. Author: Alex Zhao.
