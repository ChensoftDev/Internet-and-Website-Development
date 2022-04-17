 TweenMax.to('#title-top', 1, {
            delay: 1,
            ease: Back.easeIn,
            opacity: 1
        })
        TweenMax.to('#sub-top', 1, {
            delay: 2,
            ease: Back.easeIn,
            opacity: 1
        })

        TweenMax.to('#btn-top', 1, {
            delay: 3,
            ease: Back.easeIn,
            opacity: 1
        })
        
        TweenMax.to('.sec-top, .car', 1, {
            delay: 4,
            ease: Back.easeIn,
            opacity: 0
        })
        
        TweenMax.to('#title-end', .25, {
            delay: 5,
            ease: Elastic.easeIn,
            opacity: 1,
        })

        TweenMax.to('#title-end', .25, {
            delay: 8,
            ease: Elastic.easeIn,
            opacity: 0,
        })

        TweenMax.to('#replay', .25, {
            delay: 8.5,
            ease: Linear.easeIn,
            opacity: 1
        })
		
        
        TweenMax.to("#front-wheel", .25, {
            delay: 1.1,
            rotation: '-=360_cw',
            ease: Linear.easeNone,
            repeat: 1
        })
        TweenMax.to(".car", 1, {
            x: -200,
            ease: Back.easeOut.config(0.6),
            timeScale: 0,
            delay: 1.1,
        });
