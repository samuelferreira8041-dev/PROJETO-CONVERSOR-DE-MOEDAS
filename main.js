const convertButton = document.querySelector('.convert-button')
const currencySelect = document.querySelector('.currency-select')
const currencyFromSelect = document.querySelector('.currency-from-select')

const currencyData = {
    brl: { label: 'Real Brasileiro', symbol: 'R$', code: 'BRL', flag: '🇧🇷' },
    usd: { label: 'Dólar Americano', symbol: 'US$', code: 'USD', flag: '🇺🇸' },
    eur: { label: 'Euro', symbol: '€', code: 'EUR', flag: '🇪🇺' },
    gbp: { label: 'Libra Esterlina', symbol: '£', code: 'GBP', flag: '🇬🇧' },
    jpy: { label: 'Iene Japonês', symbol: '¥', code: 'JPY', flag: '🇯🇵' },
    cad: { label: 'Dólar Canadense', symbol: 'C$', code: 'CAD', flag: '🇨🇦' },
    chf: { label: 'Franco Suíço', symbol: 'CHF', code: 'CHF', flag: '🇨🇭' },
    aud: { label: 'Dólar Australiano', symbol: 'A$', code: 'AUD', flag: '🇦🇺' }
}

const exchangeRates = {
    brl: 1,
    usd: 0.1923,
    eur: 0.1785,
    gbp: 0.1548,
    jpy: 28.4,
    cad: 0.266,
    chf: 0.183,
    aud: 0.287
}

function parseCurrencyValue(value) {
    if (!value) return 0

    const normalizedValue = value.replace('.', '').replace(',', '.')
    const numericValue = Number(normalizedValue)

    return Number.isFinite(numericValue) ? numericValue : 0
}

function formatCurrency(value, currencyKey) {
    const currency = currencyData[currencyKey] || currencyData.brl
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency.code
    }).format(value)
}

function convertBetween(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount

    const amountInBrl = amount / exchangeRates[fromCurrency]
    return amountInBrl * exchangeRates[toCurrency]
}

function updateCurrencyDisplay() {
    const fromCurrency = currencyData[currencyFromSelect.value]
    const toCurrency = currencyData[currencySelect.value]

    const fromFlag = document.getElementById('from-flag')
    const toFlag = document.getElementById('to-flag')
    const fromName = document.getElementById('from-currency-name')
    const toName = document.getElementById('currency-name')

    if (fromFlag) fromFlag.textContent = fromCurrency.flag
    if (toFlag) toFlag.textContent = toCurrency.flag
    if (fromName) fromName.textContent = fromCurrency.label
    if (toName) toName.textContent = toCurrency.label
}

function convertValues() {
    const inputCurrencyValue = parseCurrencyValue(document.querySelector('.input-currency').value)
    const fromCurrency = currencyFromSelect.value
    const toCurrency = currencySelect.value
    const currencyValueToConvert = document.querySelector('.currency-value-to-convert')
    const currencyValueConverted = document.querySelector('.currency-value')

    const convertedValue = convertBetween(inputCurrencyValue, fromCurrency, toCurrency)

    currencyValueToConvert.textContent = formatCurrency(inputCurrencyValue, fromCurrency)
    currencyValueConverted.textContent = formatCurrency(convertedValue, toCurrency)
}

function changeCurrency() {
    updateCurrencyDisplay()
    convertValues()
}

currencySelect.addEventListener('change', changeCurrency)
currencyFromSelect.addEventListener('change', changeCurrency)
convertButton.addEventListener('click', convertValues)

updateCurrencyDisplay()
convertValues()
