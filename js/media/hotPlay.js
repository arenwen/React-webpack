import { render } from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { Router,Route, hashHistory,Link} from 'react-router'
import '../../less/media/hotPlay'
import VideoColumn from './videoColumn'

export default class HotPlay extends Component {
    componentDidMount(){
        var mySwiper = new Swiper('.swiper-container',{
            autoplay : 1000,
            pagination: '.swiper-pagination',
            paginationElement : 'li',
            autoplayStopOnLast : false,
        });
    }
    jumpNextLink(link) {
        const { history } = this.props;
        const { router } = this.context;
        console.log(this.context)
        router.push({ pathname: '/play/2', state: {aa:231} });
        console.log(this.props)

    }
    render(){
        return (
            <div className="hot-wapper">
                <div className="hot-play">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <img src="../image/test1.jpg" />
                            </div>
                            <div className="swiper-slide">
                                <img src="../image/test1.jpg" onClick={this.jumpNextLink.bind(this)}/>
                            </div>
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                    <div className="hot-play-right">
                        <div className="right-top">
                            <div>
                                <img src="../image/test2.jpg" />
                                <section className="shad-show2 sh-show">
                                    <span>全14集</span>
                                </section>
                            </div>
                            <div>
                                <img src="../image/test2.jpg" />
                                <section className="shad-show2 sh-show">
                                    <span>全14集</span>
                                </section>
                            </div>
                        </div>
                        <div className="right-bottom">
                            <div>
                                <img src="../image/test2.jpg" />
                                <section className="shad-show2 sh-show2">
                                    <span>全14集</span>
                                </section>
                            </div>
                            <div>
                                <img src="../image/test2.jpg" />
                                <section className="shad-show2 sh-show2">
                                    <span>全14集</span>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <VideoColumn message='人气新剧'/>
                <ul className="new-drama">
                    <li>
                        <img src="../image/test2.jpg" />
                        <section className="shad-show2">
                            <span>全14集</span>
                        </section>
                        <div className="new-video-name">完美世界</div>
                    </li>
                    <li>
                        <img src="../image/test2.jpg" />
                        <section className="shad-show2">
                            <span>全14集</span>
                        </section>
                        <div className="new-video-name">完美世界</div>
                    </li>
                    <li>
                        <img src="../image/test2.jpg" />
                        <section className="shad-show2">
                            <span>全14集</span>
                        </section>
                        <div className="new-video-name">完美世界</div>
                    </li>
                    <li>
                        <img src="../image/test2.jpg" />
                        <section className="shad-show2">
                            <span>全14集</span>
                        </section>
                        <div className="new-video-name">完美世界</div>
                    </li>
                </ul>
                <img src="../image/dashedcut.png" className="cutting-line"/>
                <VideoColumn message='合作品牌'/>
                <ul className="work-together">
                    <li>
                        <img src="../image/youku.png" />
                    </li>
                    <li>
                        <img src="../image/sohu.png" />
                    </li>
                    <li>
                        <img src="../image/huoxing.png" />
                    </li>
                    <li>
                        <img src="../image/kaola.png" />
                    </li>
                    <li>
                        <img src="../image/maige.png" />
                    </li>
                    <li>
                        <img src="../image/beiwawang.png" />
                    </li>
                    <li>
                        <img src="../image/landi.png" />
                    </li>
                </ul>
            </div>
        )
    }
}
HotPlay.contextTypes = {
  router: React.PropTypes.object.isRequired
};