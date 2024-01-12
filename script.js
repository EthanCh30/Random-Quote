const projectName = 'random-quote-machine';
let quotesData;

var colors = [
    '#264653', // Dark Teal
    '#2a9d8f', // Ocean Green
    '#e9c46a', // Sand Yellow
    '#f4a261', // Pastel Orange
    '#e76f51', // Terracotta
    '#6a0572', // Deep Purple
    '#d00000', // Crimson Red
    '#8a8a8a', // Gray
    '#457b9d', // Steel Blue
    '#1d3557', // Midnight Blue
    '#2d6a4f', // Forest Green
    '#b58900'  // Amber
];
var currentQuote = '',
    currentAuthor = '';

function getQuotes() {
    return $.ajax({
        headers: {
            Accept: 'application/json'
        },
        url:
            'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === 'string') {
                quotesData = JSON.parse(jsonQuotes);
                console.log('quotesData');
                console.log(quotesData);
            }
        }
    });
}

function getRandomQuote() {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
        ];
}

function getQuote() {
    let randomQuote = getRandomQuote();

    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;

    $('.quote-text').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#text').text(randomQuote.quote);
    });

    $('.quote-author').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#author').html(randomQuote.author);
    });

    var color = Math.floor(Math.random() * colors.length);
    $('html body').animate(
        {
            backgroundColor: colors[color],
            color: colors[color]
        },
        1000
    );
    $('.button').animate(
        {
            backgroundColor: colors[color]
        },
        1000
    );
}

$(document).ready(function () {
    getQuotes().then(() => {
        getQuote();
    });

    $('#new-quote').on('click', getQuote);
});
