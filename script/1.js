document.addEventListener('DOMContentLoaded', function() {
    const years = document.querySelectorAll('.year');
    const events = document.querySelectorAll('.event');
    
    function showEvent(year) {
        events.forEach(event => {
            event.classList.remove('active');
        });
        
        const targetEvent = document.querySelector(`.event[data-year="${year}"]`);
        if (targetEvent) {
            targetEvent.classList.add('active');
        }
        
        years.forEach(yearElement => {
            yearElement.classList.remove('active');
            if (yearElement.dataset.year === year) {
                yearElement.classList.add('active');
            }
        });
    }
    
    years.forEach(year => {
        year.addEventListener('click', function() {
            const yearValue = this.dataset.year;
            showEvent(yearValue);
        });
    });
    
    if (years.length > 0) {
        const firstYear = years[0].dataset.year;
        showEvent(firstYear);
    }

    function initStageBlocks(blockSelector, descriptionSelector) {
        const stageBlocks = document.querySelectorAll(blockSelector);
        const stageDescriptions = document.querySelectorAll(descriptionSelector);
        
        if (stageBlocks.length === 0) return;
        
        function activateStage(stageNumber) {
            stageBlocks.forEach(block => {
                block.classList.remove('active');
            });
            
            stageDescriptions.forEach(desc => {
                desc.classList.remove('active');
            });
            
            const targetBlock = document.querySelector(`${blockSelector}[data-stage="${stageNumber}"]`);
            const targetDescription = document.querySelector(`${descriptionSelector}[data-stage="${stageNumber}"]`);
            
            if (targetBlock) {
                targetBlock.classList.add('active');
            }
            
            if (targetDescription) {
                targetDescription.classList.add('active');
            }
        }
        
        stageBlocks.forEach(block => {
            block.addEventListener('click', function() {
                const stageNumber = this.getAttribute('data-stage');
                activateStage(stageNumber);
            });
        });
        
        activateStage('1');
    }

    initStageBlocks('.stage-block', '.stage-description');
    initStageBlocks('.puppet-stage-block', '.puppet-stage-description');
    initStageBlocks('.animation-3d-stage-block', '.animation-3d-stage-description');
    initStageBlocks('.animation-25d-stage-block', '.animation-25d-stage-description');
    initStageBlocks('.gaming-stage-block', '.gaming-stage-description');
    initStageBlocks('.indie-stage-block', '.indie-stage-description');
    initStageBlocks('.ai-stage-block', '.ai-stage-description');

    function initGenericCarousel(config) {
        const { 
            trackSelector, 
            dotsSelector, 
            prevBtnSelector, 
            nextBtnSelector, 
            containerSelector,
            slideClass,
            captionClass,
            images 
        } = config;
        
        const track = document.querySelector(trackSelector);
        const dotsContainer = document.querySelector(dotsSelector);
        
        if (!track) {
            return; 
        }
        
        track.innerHTML = '';
        
        if (dotsContainer) {
            dotsContainer.style.display = 'none';
        }
        
        images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = slideClass;
            slide.innerHTML = `
                <img src="${image.url}" alt="${image.title || 'Анимация'}" loading="lazy">
                <div class="${captionClass}">
                    <h4>${image.title || 'Студия'}</h4>
                    <p>${image.description}</p>
                </div>
            `;
            track.appendChild(slide);
        });
        
        const prevBtn = document.querySelector(prevBtnSelector);
        const nextBtn = document.querySelector(nextBtnSelector);
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        
        let currentSlide = 0;
        const totalSlides = images.length;
        
        function showSlide(index, instant = false) {
            if (track) {
                if (instant) {
                    track.style.transition = 'none';
                } else {
                    track.style.transition = 'transform 0.8s ease-in-out';
                }
                track.style.transform = `translateX(-${index * 100}%)`;
                
                if (instant) {
                    setTimeout(() => {
                        track.style.transition = 'transform 0.8s ease-in-out';
                    }, 50);
                }
            }
            currentSlide = index;
        }
        
        function nextSlide() {
            let nextSlideIndex = currentSlide + 1;
            
            if (nextSlideIndex >= totalSlides - 1) {
                showSlide(nextSlideIndex);
                setTimeout(() => {
                    showSlide(0, true)
                }, 1200);
            } else {
                showSlide(nextSlideIndex);
            }
        }
        
        let carouselInterval = setInterval(nextSlide, 3000);
        
        const carouselContainer = document.querySelector(containerSelector);
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(carouselInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                carouselInterval = setInterval(nextSlide, 3000);
            });
        }
        
        showSlide(0);
    }

    const animationStudios = [
        {
            url: "https://64.media.tumblr.com/f7c18b790363acc01131fae087b90b7a/86800d195c0a5020-f2/s540x810/ec92de7138e304fde7903ef2a2cef392717dbe01.gifv",
            title: "Walt Disney Animation Studios",
            description: "Основана в 1923, США. Белоснежка, Король Лев, Холодное сердце"
        },
        {
            url: "https://media1.tenor.com/m/fS_143fv5nYAAAAd/spirited-away.gif",
            title: "Studio Ghibli",
            description: "Основана в 1985, Япония. Унесенные призраками, Мой сосед Тоторо"
        },
        {
            url: "https://i.makeagif.com/media/9-03-2017/Ygm9mY.gif",
            title: "Warner Bros. Animation",
            description: "Основана в 1980, США. Багз Банни, Бэтмен, Лига справедливости"
        },
        {
            url: "https://i.pinimg.com/originals/a5/ed/fc/a5edfc77ca6a6a6fd078ce2e2d034d88.gif",
            title: "Cartoon Network",
            description: "Основана в 1994, США. Время приключений, Суперкрошки"
        },
        {
            url: "https://i.pinimg.com/originals/7d/a9/f0/7da9f09c8b61866d87a5c0db8e4957db.gif",
            title: "Союзмультфильм",
            description: "Основана в 1936, Россия. Ну погоди!, Чебурашка, Винни-Пух"
        },
        {
            url: "https://s8.hostingkartinok.com/uploads/images/2016/02/d54a24be1f853328a1b9996a6749830e.gif",
            title: "Студия Мельница",
            description: "Основана в 1999, Россия. Три богатыря, Карлик Нос"
        },
        {
            url: "https://64.media.tumblr.com/6030c696fe43fb22068188d38b6bc8a6/tumblr_nwn1gyP7Ly1tvyli9o1_500.gif",
            title: "Студия Пилот",
            description: "Основана в 1988, Россия. Горшочек каши, Снегурочка"
        },
        {
            url: "https://i.pinimg.com/originals/ac/d2/27/acd227a2f787b41f00e9e39b58855728.gif",
            title: "Смешарики",
            description: "Основана в 2003, Россия. Смешарики, Пин-код"
        },
        {
            url: "https://animesher.com/orig/1/180/1805/18054/animesher.com_manga-sad-sailor-moon-1805483.gif",
            title: "Toei Animation",
            description: "Основана в 1948, Япония. Sailor Moon, Dragon Ball, One Piece"
        },
        {
            url: "https://steamuserimages-a.akamaihd.net/ugc/949594998478965192/FE8778D2E09E0E82851793E2D2A340352208BA7D/",
            title: "Madhouse",
            description: "Основана в 1972, Япония. Хеллсинг, Паприка, Одинокий волк"
        },
        {
            url: "https://i.pinimg.com/originals/43/95/a6/4395a69ec32a66e0cc71b2bc9d493cd3.gif",
            title: "Production I.G",
            description: "Основана в 1987, Япония. Призрак в доспехах, Кровь+"
        },
        {
            url: "https://i.pinimg.com/originals/f0/47/1d/f0471dbf1aff467a1beab01a0886e4ff.gif",
            title: "Kyoto Animation",
            description: "Основана в 1981, Япония. K-On!, Вайолет Эвергарден"
        },
        {
            url: "https://media1.tenor.com/m/EdKtsbbHdFIAAAAd/deku-walk.gif",
            title: "Bones",
            description: "Основана в 1998, Япония. Fullmetal Alchemist, My Hero Academia"
        },
                {
            url: "https://64.media.tumblr.com/f7c18b790363acc01131fae087b90b7a/86800d195c0a5020-f2/s540x810/ec92de7138e304fde7903ef2a2cef392717dbe01.gifv",
            title: "Walt Disney Animation Studios",
            description: "Основана в 1923, США. Белоснежка, Король Лев, Холодное сердце"
        }
    ];

    const puppetAnimationStudios = [
        {
            url: "https://media1.tenor.com/m/y2liq_UHr4AAAAAC/laika-the-boxtrolls.gif",
            title: "Laika Entertainment",
            description: "Основана в 2005, Хилсборо, США. Коралина в Стране кошмаров, Паранорман, или Как приручить зомби, Бокстролли, Кубо. Легенда о самурае"
        },
        {
            url: "https://i.pinimg.com/originals/42/1e/6e/421e6efb4fe65fd28401c4b4712bcdf5.gif?nii=t",
            title: "Aardman Animations",
            description: "Основана в 1972, Бристоль, Великобритания. Побег из курятника», Уоллес и Громит: Проклятие кролика-оборотня, Смывайся!, Секретная служба Санта-Клауса"
        },
        {
            url: "https://66.media.tumblr.com/4d85c4d99c026b2cdf7f857ccc53be81/tumblr_mupf2gnS4y1sdmru8o1_400.gif",
            title: "Союзмультфильм (кукольное отделение)",
            description: "С 1936, Москва, Россия. Варежка, 38 попугаев, волк и теленок, боцман и попугай, чебурашка"
        },
        {
            url: "https://media1.tenor.com/m/0fKtewDiXzkAAAAd/mingler-discord.gif",
            title: "Wes Anderson's Animation Team",
            description: "Работает с 2009, США/Франция. Бесподобный мистер Фокс, Остров собак, Астероид-Сити"
        },
        {
            url: "https://i.pinimg.com/originals/63/12/50/631250303ee16db55ed608ad714ff59e.gif",
            title: "Skellington Productions",
            description: "1985, Америка, Калифорния. Кошмар перед Рождеством."
        },
        {
            url: "https://media1.tenor.com/m/y2liq_UHr4AAAAAC/laika-the-boxtrolls.gif",
            title: "Laika Entertainment",
            description: "Основана в 2005, Хилсборо, США. Коралина в Стране кошмаров, Паранорман, или Как приручить зомби, Бокстролли, Кубо. Легенда о самурае"
        }
    ];

    const animation3DStudios = [
        {
            url: "https://avatars.mds.yandex.net/i?id=e6871e510c89d0cb513ec0c55127829964fc7a26-4444989-images-thumbs&n=13",
            title: "Pixar Animation Studios",
            description: "Основана в 1986, США. История игрушек, В поисках Немо, Суперсемейка, Тайна Коко"
        },
        {
            url: "https://media1.tenor.com/m/rkcDQeN3iaEAAAAC/shrek-fiona.gif",
            title: "DreamWorks Animation",
            description: "Основана в 1994, США. Шрек, Мадагаскар, Как приручить дракона, Кунг-фу панда"
        },
        {
            url: "https://media1.tenor.com/m/xhJ5MrNVUTsAAAAC/rio-rio-movie.gif",
            title: "Blue Sky Studios",
            description: "Основана в 1987, США. Ледниковый период, Рио, Эпик, Хортон"
        },
        {
            url: "https://steamuserimages-a.akamaihd.net/ugc/1817768465601588895/C2D7B15DA769D43D6A8093146B39F6B84DA575F4/?imw=512&imh=288&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
            title: "Walt Disney Animation Studios (3D)",
            description: "Основана в 1923, США. Холодное сердце, Зверополис, Моана, Райя и последний дракон"
        },
        {
            url: "https://cdn.dailyshorts.io/DailyNewsletter/daily_newsletter_5028_1720435654.gif",
            title: "Illumination Entertainment",
            description: "Основана в 2007, США. Гадкий я, Миньоны, Тайная жизнь домашних животных, Супер Марио"
        },
        {
            url: "https://media.tenor.com/Z3L_q2vxdhYAAAAM/sad-hamm.gif",
            title: "Pixar Animation Studios",
            description: "Основана в 1986, США. История игрушек, В поисках Немо, Суперсемейка, Тайна Коко"
        },
        {
            url: "https://avatars.mds.yandex.net/i?id=e6871e510c89d0cb513ec0c55127829964fc7a26-4444989-images-thumbs&n=13",
            title: "Pixar Animation Studios",
            description: "Основана в 1986, США. История игрушек, В поисках Немо, Суперсемейка, Тайна Коко"
        }
    ];

    const animation25DStudios = [
        {
            url: "https://64.media.tumblr.com/c8ecb306e2117933cf07bd59fffe8095/0f8bdc1c1727f574-1c/s540x810/340fec5ecae4380f22cb99f2eb3cb9a6eadfeaab.gifv",
            title: "Sony Pictures Animation",
            description: "Основана в 2002, Калвер-Сити, США. Человек-паук: Через вселенные, Человек-паук: Паутина вселенных, КПОП: Охотницы на демонов."
        },
        {
            url: "https://media1.tenor.com/m/sRxj3PNZ7AoAAAAd/going-down-spider-web.gif",
            title: "Imageworks (подразделение Sony)",
            description: "Основано в 1992, Ванкувер, Канада. Технический разработчик и главный движок визуального прорыва фильмов про Человека-паука от Sony."
        },
        {
            url: "https://media1.tenor.com/m/fcffFadEdkwAAAAC/rushing-big-bad-wolf.gif",
            title: "DreamWorks Animation",
            description: "Основана в 1994, Глендейл, США. Кот в сапогах 2: Последнее желание."
        },
        {
            url: "https://i.pinimg.com/originals/d7/01/d3/d701d3ad08f3e459053e945bd5c39332.gif",
            title: "Science SARU",
            description: "Основана в 2013, Токио, Япония. Пинг-понг, Девичьи откровения, Космический денди, Эми и инопланетяне."
        },
        {
            url: "https://media.tenor.com/9e-JqlCbIqQAAAAM/wtf-three-robots.gif",
            title: "Blur Studio",
            description: "Основана в 1995, Венис, США. Известны короткометражками и трейлерами, Love, Death & Robots (эпизоды Подписанный Зигги, Три робота)"
        },
        {
            url: "https://media1.tenor.com/m/ls9tKgvPx2AAAAAd/wolfwalker.gif",
            title: "Cartoon Saloon",
            description: "Основана в 1999, Томом Муром, Норой Туоми и Полом Янгом. Легенда о волках, Тайна Келлс, Песнь моря"
        },
        {
            url: "https://media1.tenor.com/m/wON_zjzBCzgAAAAC/arcane-season-2-jinx.gif",
            title: "Fortiche",
            description: "Основана в 2009, Париж, Франция. Аркейн, Le dernier Gaulois"
        },
        {
            url: "https://64.media.tumblr.com/c8ecb306e2117933cf07bd59fffe8095/0f8bdc1c1727f574-1c/s540x810/340fec5ecae4380f22cb99f2eb3cb9a6eadfeaab.gifv",
            title: "Sony Pictures Animation",
            description: "Основана в 2002, Калвер-Сити, США. Человек-паук: Через вселенные, Человек-паук: Паутина вселенных, КПОП: Охотницы на демонов."
        },
    ];

    const indieAnimationStudios = [
        {
            url: "https://media1.tenor.com/m/jwGfrDg5xwIAAAAC/n-murder-drones.gif",
            title: "Murder Drones",
            description: "Cозданный Лиамом Викерсом и спродюсированный Glitch Productions."
        },
        {
            url: "https://media1.tenor.com/m/ZKPttZN_GQgAAAAC/helluva-boss-fizzarolli-fizzarolli.gif",
            title: "Helluva boss",
            description: "Создан небольшой командой. Проект Вивьен Медрано (режиссер, сценарист, художник)"
        },
        {
            url: "https://media1.tenor.com/m/AD-YBT4iVkEAAAAd/lackadaisy-mordecai.gif",
            title: "Lucky daisy",
            description: "Трейси Дж. Батлер — создательница веб-комикса (в последствии мультсериал) Lackadaisy"
        },
        {
            url: "https://media1.tenor.com/m/Bw96PbrRmooAAAAC/jax-digital-circus-blocking.gif",
            title: "The Amazing Digital Circus",
            description: "Купер Смит Гудвин (известной под псевдонимом Gooseworx) и спродюсированный компанией Glitch Productions."
        },
        {
            url: "https://i.pinimg.com/originals/7f/b6/ad/7fb6adf04cd809d2722e96047592922e.gif",
            title: "Metal Family",
            description: "Алина Ковалёва и Дмитрий Вдовенко - создатели российского комедийно-драматического анимационного веб-сериала Metal Family"
        },
        {
            url: "https://media1.tenor.com/m/rhpOqz8Kc7gAAAAC/ramshackle-stone.gif",
            title: "Ramshackle",
            description: "Автор под ником Zeddyzi создал анимационный сериал Ramshackle"
        },
        {
            url: "https://media1.tenor.com/m/jwGfrDg5xwIAAAAC/n-murder-drones.gif",
            title: "Murder Drones",
            description: "Cозданный Лиамом Викерсом и спродюсированный Glitch Productions."
        }
    ];

    const gamingAnimationStudios = [
        {
            url: "https://i.pinimg.com/originals/2d/0e/5b/2d0e5bbb67d5814e00d2ea9beb7f6f36.gif",
            title: "Telltale",
            description: "Основана в июне 2004, в сентябре 2018 года компания объявила о банкротстве. Batman: The Telltale Series, The Wolf Among Us, The Walking dead."
        },
        {
            url: "https://media1.tenor.com/m/wpErBV0msfYAAAAd/the-last-of-us-part2-the-last-of-us.gif",
            title: "Naughty Dog",
            description: "Основана в 1984 году, в 2001 году студия была приобретена Sony Computer Entertainment. Uncharted, The Last of Us."
        },
        {
            url: "https://images.steamusercontent.com/ugc/928178801495888553/37E6767A1DD8F409FE5CFBFB9AA5B0861CE18CAE/?imw=512&amp;&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=false",
            title: "CD Projekt Red",
            description: "Основана в 2002. The Witcher 3, Cyberpunk 2077."
        },
        {
            url: "https://i.pinimg.com/originals/4f/28/64/4f2864932a6f35970026a557d0485729.gif",
            title: "Killmonday Games",
            description: "Была создана в 2012 году. Fran Bow, Little Misfortune"
        },
        {
            url: "https://media1.tenor.com/m/Khe68eeiRU0AAAAd/venti-genshin-impact-venti.gif",
            title: "miHoYo",
            description: "Была создана в 2012 году. Honkai: Star Rai, Zenless Zone Zero, Genshin impact"
        },
        {
            url: "https://avatars.dzeninfra.ru/get-zen_doc/9662754/pub_643ab76474f83043f34f4fc5_643ab76b74f83043f34f4fd2/orig",
            title: "ZA/UM",
            description: "Основана в 2016. Disco Elysium"
        },
        {
            url: "https://i.pinimg.com/originals/2d/0e/5b/2d0e5bbb67d5814e00d2ea9beb7f6f36.gif",
            title: "Telltale",
            description: "Основана в июне 2004, в сентябре 2018 года компания объявила о банкротстве. Batman: The Telltale Series, The Wolf Among Us, The Walking dead."
        },
    ];

    const aiAnimationStudios = [
        {
            url: "https://avatars.mds.yandex.net/i?id=c24c42638976b5062b3ddc8587c22688d7f51e36-4250949-images-thumbs&n=13",
            title: "ИИ",
            description: ""
        },
        {
            url: "https://media1.tenor.com/m/qpa0_rMHW2IAAAAC/draw-claire-and-the-crosbys.gif",
            title: "Радость творчества",
            description: ""
        },
        {
            url: "https://minsknews.by/wp-content/uploads/2024/12/zubr_bublik_i_alesya.jpg",
            title: "ИИ",
            description: ""
        },
        {
            url: "https://media1.tenor.com/m/LxaQ_irnwmkAAAAC/anime-anime-gif.gif",
            title: "Радость творчества",
            description: ""
        },
        {
            url: "https://cdn.mos.cms.futurecdn.net/C2WgjDcbyPrwsEZhUbvdkA-840-80.jpg",
            title: "ИИ",
            description: ""
        },
        {
            url: "https://media1.tenor.com/m/4OrmENvVEGQAAAAC/art-drawing.gif",
            title: "Радость творчества",
            description: ""
        },
        {
            url: "https://media1.tenor.com/m/MZIgKEXXTT4AAAAC/brr-brr-patapim-br-br-patapim.gif",
            title: "ИИ",
            description: ""
        },
        {
            url: "https://media1.tenor.com/m/8Z4_sHbqwT8AAAAC/sketching-where-the-crawdads-sing.gif",
            title: "Радость творчества",
            description: ""
        },
        {
            url: "https://avatars.mds.yandex.net/i?id=c24c42638976b5062b3ddc8587c22688d7f51e36-4250949-images-thumbs&n=13",
            title: "ИИ",
            description: ""
        },
    ];

    initGenericCarousel({
        trackSelector: '.carousel-track',
        dotsSelector: '.carousel-dots',
        prevBtnSelector: '.carousel-prev',
        nextBtnSelector: '.carousel-next',
        containerSelector: '.carousel-container',
        slideClass: 'carousel-slide',
        captionClass: 'carousel-caption',
        images: animationStudios
    });

    initGenericCarousel({
        trackSelector: '.puppet-carousel-track',
        dotsSelector: '.puppet-carousel-dots',
        prevBtnSelector: '.puppet-carousel-prev',
        nextBtnSelector: '.puppet-carousel-next',
        containerSelector: '.puppet-carousel-container',
        slideClass: 'puppet-carousel-slide',
        captionClass: 'puppet-carousel-caption',
        images: puppetAnimationStudios
    });

    initGenericCarousel({
        trackSelector: '.carousel-3d-track',
        dotsSelector: '.carousel-3d-dots',
        prevBtnSelector: '.carousel-3d-prev',
        nextBtnSelector: '.carousel-3d-next',
        containerSelector: '.carousel-3d-container',
        slideClass: 'carousel-3d-slide',
        captionClass: 'carousel-3d-caption',
        images: animation3DStudios
    });

    initGenericCarousel({
        trackSelector: '.carousel-25d-track',
        dotsSelector: '.carousel-25d-dots',
        prevBtnSelector: '.carousel-25d-prev',
        nextBtnSelector: '.carousel-25d-next',
        containerSelector: '.carousel-25d-container',
        slideClass: 'carousel-25d-slide',
        captionClass: 'carousel-25d-caption',
        images: animation25DStudios
    });

    initGenericCarousel({
        trackSelector: '.indie-carousel-track',
        dotsSelector: '.carousel-dots',
        prevBtnSelector: '.carousel-prev',
        nextBtnSelector: '.carousel-next',
        containerSelector: '.indie-carousel-container',
        slideClass: 'indie-carousel-slide',
        captionClass: 'indie-carousel-caption',
        images: indieAnimationStudios
    });

    initGenericCarousel({
        trackSelector: '.gaming-carousel-track',
        dotsSelector: '.carousel-gaming-dots',
        prevBtnSelector: '.carousel-gaming-prev',
        nextBtnSelector: '.carousel-gaming-next',
        containerSelector: '.gaming-carousel-container',
        slideClass: 'gaming-carousel-slide',
        captionClass: 'gaming-carousel-caption',
        images: gamingAnimationStudios
    });

    initGenericCarousel({
        trackSelector: '.ai-carousel-track',
        dotsSelector: '.carousel-ai-dots',
        prevBtnSelector: '.carousel-ai-prev',
        nextBtnSelector: '.carousel-ai-next',
        containerSelector: '.ai-carousel-container',
        slideClass: 'ai-carousel-slide',
        captionClass: 'ai-carousel-caption',
        images: aiAnimationStudios
    });

    const animationSlider = document.querySelector('.modern-animation-slider');
    
    if (animationSlider) {
        const sliderContainer = animationSlider.querySelector('.animation-slider-container');
        const sliderTrack = animationSlider.querySelector('.animation-slider-track');
        const slides = animationSlider.querySelectorAll('.animation-slide');
        
        if (sliderTrack && slides.length > 0) {
            const navHTML = `
                <button class="animation-slider-nav prev">‹</button>
                <button class="animation-slider-nav next">›</button>
                <div class="animation-slider-progress"></div>
            `;
            sliderContainer.insertAdjacentHTML('beforeend', navHTML);
            
            const prevBtn = sliderContainer.querySelector('.animation-slider-nav.prev');
            const nextBtn = sliderContainer.querySelector('.animation-slider-nav.next');
            const progressContainer = sliderContainer.querySelector('.animation-slider-progress');
            
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'animation-slider-dot';
                dot.dataset.index = index;
                progressContainer.appendChild(dot);
            });
            
            const dots = progressContainer.querySelectorAll('.animation-slider-dot');
            
            let currentIndex = 2; 
            const totalSlides = slides.length;
            const slideWidth = slides[0].offsetWidth + 20; 
            
            function update3DEffects() {
                slides.forEach((slide, index) => {
                    const distance = index - currentIndex;
                    let rotation = distance * 15; 
                    let scale = 1 - Math.abs(distance) * 0.1; 
                    let zIndex = 10 - Math.abs(distance);
                    
                    scale = Math.max(0.7, Math.min(1, scale));
                    
                    zIndex = Math.max(1, Math.min(10, zIndex));
                    
                    slide.style.transform = `rotateY(${rotation}deg) scale(${scale})`;
                    slide.style.zIndex = zIndex;
                    slide.style.opacity = scale >= 0.7 ? '1' : '0.6';
                });
                
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            function goToSlide(index) {
                currentIndex = Math.max(0, Math.min(totalSlides - 1, index));
                
                const trackTransform = -currentIndex * slideWidth + (sliderContainer.offsetWidth / 2 - slideWidth / 2);
                sliderTrack.style.transform = `translateX(${trackTransform}px)`;
                
                update3DEffects();
                
                localStorage.setItem('animation-slider-current', currentIndex);
            }
            
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
            });
            
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
            });
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
            });
            
            let autoSlideInterval = setInterval(() => {
                nextBtn.click();
            }, 5000);
            
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    nextBtn.click();
                }, 5000);
            });
            
            document.addEventListener('keydown', (e) => {
                if (document.activeElement.tagName === 'INPUT') return;
                
                if (e.key === 'ArrowLeft') {
                    prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    nextBtn.click();
                }
            });
            
            setTimeout(() => {
                goToSlide(currentIndex);
                sliderTrack.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                sliderTrack.classList.add('initialized');
            }, 100);
            
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    goToSlide(currentIndex);
                }, 250);
            });
            
            function handleSlideNavigation(event) {
                event.preventDefault();
                
                const slide = event.currentTarget;
                const href = slide.getAttribute('href');
                const slideIndex = Array.from(slides).indexOf(slide);
                
                localStorage.setItem('animation-slider-current', slideIndex);
                
                if (href.includes('#')) {
                    const [page, anchor] = href.split('#');
                    
                    if (page === window.location.pathname || page === '') {
                        const targetSection = document.getElementById(anchor);
                        if (targetSection) {
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    } else {
                        window.location.href = href;
                    }
                } else {
                    window.location.href = href;
                }
            }
            
            slides.forEach(slide => {
                slide.addEventListener('click', handleSlideNavigation);
            });
            
            const savedIndex = localStorage.getItem('animation-slider-current');
            if (savedIndex !== null) {
                setTimeout(() => {
                    goToSlide(parseInt(savedIndex));
                }, 100);
            }
        }
    }
});