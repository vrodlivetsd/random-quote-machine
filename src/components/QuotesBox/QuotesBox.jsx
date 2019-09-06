import React, {Component} from 'react';
import styles from './styles.module.scss';
import Twitter from '../../assets/twitter.svg';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

const COLORS_ARR = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

class QuotesBox extends Component {

    constructor(props){
        super(props);

        this.state = {
            mainColor: '',
            quotes: [],
            currentQuote: []
        };

        this.getNewQuote = this.getNewQuote.bind(this);
    }

    componentDidMount() {
        this.getQuotes();
    }

    async getQuotes(){
        const URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
        let response = await fetch(URL);
        let quotesArr = await response.json();
        this.setState({
            mainColor: COLORS_ARR[Math.floor(Math.random() * COLORS_ARR.length)],
            quotes: quotesArr.quotes,
            currentQuote: quotesArr.quotes[Math.floor(Math.random() * quotesArr.quotes.length)]
        });
    }

    getNewQuote() {
        const { quotes } = this.state;

        this.setState({
            mainColor: COLORS_ARR[Math.floor(Math.random() * COLORS_ARR.length)],
            currentQuote: quotes[Math.floor(Math.random() * quotes.length)]
        });
    }

    render () {
        const { mainColor, currentQuote } = this.state;
        return (
            <div className={styles.wrapper} style={{backgroundColor: mainColor}}>
                <div className={styles.quotesBox}>
                    <div className={styles.quote}>
                        <FormatQuoteIcon className={styles.quoteIcon}/>
                        <span>{currentQuote.quote}</span>                        
                    </div>
                    <div className={styles.author}>
                        <span>- {currentQuote.author}</span> 
                    </div>
                    <div className={styles.buttons}>
                        <a href={`https://twitter.com/intent/tweet?text=${currentQuote.quote} ${currentQuote.author}`} target="_blank" rel="noopener noreferrer" title="New Twitter post">
                            <img className={styles.tweetBtn} style={{backgroundColor: mainColor}} src={Twitter} alt='Twitter'/>
                        </a>
                        <input className={styles.newQuoteBtn} style={{backgroundColor: mainColor}} type='button' value='New quote' onClick={this.getNewQuote}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuotesBox;