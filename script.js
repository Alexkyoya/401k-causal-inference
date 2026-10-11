const stats = {
  households: 9915,
  eligibleRate: 37.1,
  participationRate: 26.2,
  meanNetAssets: 18051.53,
  eligibleMean: 30347.39,
  nonEligibleMean: 10788.04,
  incomeGap: 15368.07,
  homeOwnerShare: 63.52,
  eligibleBarPercent: 76.8,
  nonEligibleBarPercent: 45.2,
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value) => `${value.toFixed(1)}%`;

const setText = (id, content) => {
  const el = document.getElementById(id);
  if (el) el.textContent = content;
};

setText('meanNetTFA', formatCurrency(stats.meanNetAssets));
setText('eligibleMean', formatCurrency(stats.eligibleMean));
setText('nonEligibleMean', formatCurrency(stats.nonEligibleMean));
setText('eligibilityRate', formatPercent(stats.eligibleRate));
setText('participationRate', formatPercent(stats.participationRate));
setText('incomeGap', `+$${Math.round(stats.incomeGap).toLocaleString('en-US')}`);
setText('homeownerShare', formatPercent(stats.homeOwnerShare));
setText('differenceAmount', `+$${Math.round(stats.eligibleMean - stats.nonEligibleMean).toLocaleString('en-US')}`);
setText('differenceAmountFr', `+$${Math.round(stats.eligibleMean - stats.nonEligibleMean).toLocaleString('en-US')}`);

const eligibleBar = document.getElementById('eligibleBar');
const nonEligibleBar = document.getElementById('nonEligibleBar');

if (eligibleBar) eligibleBar.style.width = `${stats.eligibleBarPercent}%`;
if (nonEligibleBar) nonEligibleBar.style.width = `${stats.nonEligibleBarPercent}%`;

const langButtons = document.querySelectorAll('.lang-btn');
const langBlocks = document.querySelectorAll('.lang-content');

const setLanguage = (lang) => {
  langButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });

  langBlocks.forEach((block) => {
    const isActive = block.classList.contains(lang);
    block.classList.toggle('active', isActive);
  });

  document.documentElement.lang = lang;
};

setLanguage('fr');

langButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});
