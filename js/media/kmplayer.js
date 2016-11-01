import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import { Router,Route, hashHistory,Link} from 'react-router';
import '../../less/media/kmplayer';
import VideoColumn from './videoColumn'

export default class Kmplayer extends Component {
	componentDidMount(){
        var mySwiper = new Swiper('.kmplayer-swiper',{
            autoplay : 1000,
            pagination: '.swiper-pagination',
            paginationElement : 'li',
            autoplayStopOnLast : false,
        });
    }
    render(){
        return (
            <div className="kmplayer">
                <div className="swiper-container kmplayer-swiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <img src="../image/test1.jpg" />
                        </div>
                        <div className="swiper-slide">
                            <img src="../image/test1.jpg" />
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="recommend">
                	<VideoColumn message='为我推荐'/>
                	<ul className="recommend-list">
                		<li>
                			<img src="../image/test3.jpg" />
                			<div>七月半之恐怖</div>
                		</li>
                		<li>
							<img src="../image/test3.jpg" />
							<div>七月半之恐怖</div>
                		</li>
                		<li>
							<img src="../image/test3.jpg" />
							<div>七月半之恐怖</div>
                		</li>
                		<li>
							<img src="../image/test3.jpg" />
							<div>七月半之恐怖</div>
                		</li>
                		<li>
							<img src="../image/test3.jpg" />
							<div>七月半之恐怖</div>
                		</li>
                		<li>
							<img src="../image/test3.jpg" />
							<div>七月半之恐怖</div>
                		</li>
                	</ul>
                </div>
            </div>
        )
    }
}