import React, { Component } from 'react'
import Newsitem from './Nesitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        console.log("Hello I am a constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6272331321fe487a9013c9c45f12653d&page=1&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
    }

    handelPrevClick = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6272331321fe487a9013c9c45f12653d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            page: this.state.page - 1,
            loading: false
        })
    }

    handelNextClick = async () => {
        console.log("Next");
        if (this.state.page + 1 <= (Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6272331321fe487a9013c9c45f12653d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({
                loading: true
            })
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                articles: parseData.articles,
                page: this.state.page + 1,
                loading: false
            })
        }
    }
    render() {
        return (
            <div className="container my-3">
                <h2 style={{ textAlign: 'center' }}>NewsMonkey - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handelPrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handelNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
