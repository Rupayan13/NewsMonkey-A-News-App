import React, { Component } from 'react'

export class Nesitem extends Component {
    render() {
        let { title, description, imageurl, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card" style={{ width: '18rem' }}>
                    <img src={imageurl ? imageurl : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} className="card-img-top" alt="News Image" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {source}
                            <span class="visually-hidden">unread messages</span>
                        </span>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Nesitem
