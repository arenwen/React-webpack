import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import { Router,Route, hashHistory,Link} from 'react-router';
import '../../less/media/cartoon';
import VideoColumn from './videoColumn'

export default class Cartoon extends Component {
	componentDidMount(){
        var mySwiper = new Swiper('.cartoon-swiper',{
            autoplay : 1000,
            pagination: '.swiper-pagination',
            paginationElement : 'li',
            autoplayStopOnLast : false,
        });
    }
    render(){
        return (
            <div className="cartoon">
                <div className="swiper-container cartoon-swiper">
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
                <div className="cartoon-kind">
                	<VideoColumn message="人气动画" />
                	<ul className="cartoon-list">
                		<li>
                			<img src="../image/test4.jpg" />
                			<div>夕阳天使</div>
                		</li>
                		<li>
                			<img src="../image/test4.jpg" />
                			<div>夕阳天使</div>
                		</li>
                		<li>
                			<img src="../image/test4.jpg" />
                			<div>夕阳天使</div>
                		</li>
                		<li>
                			<img src="../image/test4.jpg" />
                			<div>夕阳天使</div>
                		</li>
                	</ul>
                	<img src="../image/dashedcut.png" className="cutting-line"/>
                	<VideoColumn message="最火推荐" classnames="hotcartoon"/>
                	<ul className="cartoon-list">
                		<li>
                			<img src="../image/test4.jpg" />
                			<div>绝色武器</div>
                		</li>
                		<li>
                			<img src="../image/test4.jpg" />
                			<div>绝色武器</div>
                		</li>
                		<li>
                			<img src="../image/test4.jpg" />
                			<div>绝色武器</div>
                		</li>
                		<li>
                			<img src="../image/test4.jpg" />
                			<div>绝色武器</div>
                		</li>
                	</ul>
                </div>

            </div>
        )
    }
}