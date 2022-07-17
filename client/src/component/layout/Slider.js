import React, { useEffect } from 'react'
import bookstore from '../../images/bookstore.mp4'
import audio from '../../images/audio.mp3'
import { useState } from "react";

const useAudio = (url) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

const Slider = () => {
    const [playing, toggle] = useAudio(audio);

    return (

        <section className="showcase">

            <div className="video-container">
                <video autoPlay muted loop >
                    <source src={bookstore} type="video/mp4" />
                </video>

            </div>
            <div className="content">
                <h1>Tiệm sách team 2 </h1>
                <h3>Xin chào quý khách</h3>
                <a href="#about" className="btn">Tìm hiểu ngay</a>
                <div className="bottom-left"
                    onClick={toggle}>{playing ? <i className="fa-solid fa-pause fa-4x"></i> : <i className="fa-solid fa-play fa-4x"></i>}</div>
            </div>
        </section>
    )
}

export default Slider