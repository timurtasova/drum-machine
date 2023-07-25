import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { useState, useEffect } from 'react';

function App() {
    const [isOpen, setIsOpen] = useState(true);
    const [viewer, setViewer] = useState('');
    const [volume, setVolume] = useState(0.5);

    useEffect(() => {
        const handler = (e) => {
            audios.map(drumPad => {
                if (e.key.toUpperCase() === drumPad.key) {
                    const audio = document.getElementById(drumPad.key);
                    audio.parentElement.classList.add('active');
                    setTimeout(() => audio.parentElement.classList.remove('active'), 100);
                    audio.click();
                }
            });
        }
        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        }
    }, []);

    const audios = [
        {
            key: "Q",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
            label: "Heater-1"
        },
        {
            key: "W",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
            label: "Heater-2"
        },
        {
            key: "E",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
            label: "Heater-3"
        },
        {
            key: "A",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
            label: "Heater-4"
        },
        {
            key: "S",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
            label: "Clap"
        },
        {
            key: "D",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
            label: "Open HH"
        },
        {
            key: "Z",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
            label: "Kick n' Hat"
        },
        {
            key: "X",
            src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
            label: "Kick"
        },
        {
            key: "C",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
            label: "Closed HH"
        }
    ];

    const renderedDrumPads = audios.map(drumPad => {
        return (
            <div
                id={drumPad.label}
                onClick={() => handleClick(drumPad)}
                className="drum-pad col-4"
                key={drumPad.src}
            >
                <audio
                    id={drumPad.key}
                    src={drumPad.src}
                    className="clip"
                />
                {drumPad.key}
            </div>
        );
    });

    const handleClick = (drumPad) => {
        const audio = document.getElementById(drumPad.key);
        if (isOpen) {
            audio.currentTime = 0;
            audio.volume = volume;
            audio.play();
            setViewer(drumPad.label);
        }
    }

    const handleChange = () => {
        setIsOpen(prevState => !prevState);
        if (isOpen) {
            setViewer('');
        }
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value * 0.01);
        setViewer(`volume: ${e.target.value}`);
    };

    return (
        <div className="container" id="drum-machine">
            <h1 className="text-primary">Drum Machine</h1>
            <div className="d-flex border justify-content-between bg-success-subtle align-items-center border-4 p-4 border-primary rounded">
                <div className="drum-pads d-flex row">
                    {renderedDrumPads}
                </div>
                <form className="form d-flex flex-column align-items-center p-3 w-1/3">
                    <label htmlFor="power" className="form-label fw-bold">Power</label>
                    <div className="form-check form-switch">
                        <input onChange={handleChange} className="form-check-input" type="checkbox" role="switch" checked={isOpen} />
                    </div>
                    <div id="display" className="p-3 bg-primary text-white text-center my-4 fw-bold">
                        {viewer}
                    </div>
                    <input onChange={handleVolumeChange} type="range" id="volume" className="w-40" />
                </form>
            </div>
        </div>
    );
}

export default App;
