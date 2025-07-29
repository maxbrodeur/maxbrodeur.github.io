class Timeline {
    constructor() {
        this.timelineData = [
            {
                "year": "2025",
                "entries": [
                    {
                        "date": "",
                        "title": "Max Planck Institute for Brain Research",
                        "text": "Student researcher in the Neural Systems Department led by Gilles Laurent, working on connectomics and neural computation.",
                        "media": [
                            {
                                "type": "image",
                                "image": "./assets/images/timeline/zeitgeist.jpg",
                                "description": "Frankfurt am Main, Germany"
                            }
                        ]
                    }
                ]
            },
            {
                "year": "2024",
                "entries": [
                    {
                        "date": "",
                        "title": "EPFL",
                        "text": "Master's in Computational Science & Engineering. Research in knot theory, mathematical optimization, and machine learning.",
                        "media": [
                            {
                                "type": "image",
                                "image": "./assets/images/timeline/mcgill_logo.jpg",
                                "description": "Lausanne, Switzerland"
                            }
                        ]
                    },
                    {
                        "date": "",
                        "title": "Smooth Rolling Knots",
                        "text": "Published research on knot theory and topology at Bridges Mathematical Art Conference. Investigation of smooth rolling motions and geometric constraints.",
                        "media": [
                            {
                                "type": "image",
                                "image": "./assets/images/smk_thumb.jpg",
                                "description": "Mathematical visualization of knot dynamics"
                            }
                        ]
                    }
                ]
            },
            {
                "year": "2023",
                "entries": [
                    {
                        "date": "",
                        "title": "Ubisoft Montréal",
                        "text": "Second internship with the \"bots\" team. Worked on foundation models for NPC navigation tasks.",
                        "media": [
                            {
                                "type": "image",
                                "image": "./assets/images/timeline/zeitgeist.jpg",
                                "description": "Proudly representing our team at the annual Ubisoft Montréal event :)"
                            }
                        ]
                    },
                    {
                        "date": "",
                        "title": "McGill University",
                        "text": "BSc Mathematics & Computer Science (2019-2023). Graduated with distinction.",
                        "media": [
                            {
                                "type": "image",
                                "image": "./assets/images/timeline/mcgill_logo.jpg",
                                "description": "Montréal, Canada"
                            }
                        ]
                    }
                ]
            },
            {
                "year": "2022",
                "entries": [
                    {
                        "date": "",
                        "title": "Ubisoft Montréal",
                        "text": "Research internship with the Reinforcement Learning team. Worked on a constrained RL implementation for self driving cars in AAA video games. (<a href=\"https://montreal.ubisoft.com/en/constrained-reinforcement-learning-and-self-driving-cars-an-interns-journey/\">link to blog post</a>)",
                        "media": [
                            {
                                "type": "image",
                                "image": "./assets/thumbnails/cars.gif",
                                "description": "The framework in action! (© Ubisoft Entertainment)"
                            }
                        ]
                    }
                ]
            },
            {
                "year": "2021",
                "entries": [
                    {
                        "date": "",
                        "title": "Ubisoft Montréal",
                        "text": "Developed high resolution facial mesh manipulation tools with the <a href=\"https://montreal.ubisoft.com/en/using-ml-and-complex-math-to-deconstruct-and-reconstruct-human-faces/\">Faceshifter team</a>.",
                        "media": [
                            {
                                "type": "image",
                                "image": "./assets/images/timeline/faces.jpg",
                                "description": "Running a \"mouth closing\" operation on a high resolution scan of my face. (© Ubisoft Entertainment)"
                            }
                        ]
                    }
                ]
            },
            {
                "year": "2020",
                "entries": [
                    {
                        "date": "",
                        "title": "Camp Découverte Techno",
                        "text": "Converted our material to an online format due to the pandemic. We still managed to have fun!",
                        "media": [
                            {
                                "type": "image",
                                "image": "./assets/images/timeline/zoom.jpg",
                                "description": "Virtual programming camp during COVID-19"
                            }
                        ]
                    }
                ]
            },
            {
                "year": "2019",
                "entries": [
                    {
                        "date": "",
                        "title": "Camp Découverte Techno",
                        "text": "Developed and taught week-long day camp courses on various Computer Science topics for kids aged 11-16.",
                        "media": [
                            {
                                "type": "image",
                                "image": "./assets/images/timeline/cdt.png",
                                "description": "Teaching programming and computer science"
                            }
                        ]
                    }
                ]
            },
            {
                "year": "2017-2019",
                "entries": [
                    {
                        "date": "",
                        "title": "Collège de Maisonneuve",
                        "text": "DEC Mathematics & Computer Science (2017-2019). Foundation in pure mathematics and programming.",
                        "media": [
                            {
                                "type": "image",
                                "image": "./assets/images/maisonneuve_logo.jpg",
                                "description": "Montréal, Canada"
                            }
                        ]
                    }
                ]
            }
        ];
        this.init();
    }

    async init() {
        try {
            this.renderTimeline();
        } catch (error) {
            console.error('Error initializing timeline:', error);
        }
    }

    renderTimeline() {
        const timelineContainer = document.getElementById('timeline');
        if (!timelineContainer || !this.timelineData) {
            console.error('Timeline container not found or no data available');
            return;
        }

        // Clear existing content
        timelineContainer.innerHTML = '';

        // Create timeline section
        const timelineSection = document.createElement('div');
        timelineSection.className = 'timeline_section';
        
        // Add title
        const title = document.createElement('div');
        title.className = 'timeline_title';
        title.innerHTML = '<h1>My Journey</h1>';
        timelineSection.appendChild(title);

        // Create timeline container with central line
        const timelineMainContainer = document.createElement('div');
        timelineMainContainer.className = 'timeline_container';

        // Create timeline entries
        this.timelineData.forEach(yearData => {
            const yearElement = this.createYearElement(yearData.year, yearData.entries);
            timelineMainContainer.appendChild(yearElement);
        });

        timelineSection.appendChild(timelineMainContainer);
        timelineContainer.appendChild(timelineSection);
    }

    createYearElement(year, entries) {
        const yearDiv = document.createElement('div');
        yearDiv.className = 'timeline_year';
        
        // Year header
        const yearHeader = document.createElement('h2');
        yearHeader.className = 'year_text';
        yearHeader.textContent = year;
        yearDiv.appendChild(yearHeader);

        // Process entries for this year
        entries.forEach(entry => {
            const segmentDiv = this.createSegmentElement(entry);
            yearDiv.appendChild(segmentDiv);
        });

        return yearDiv;
    }

    createSegmentElement(entry) {
        const segmentDiv = document.createElement('div');
        segmentDiv.className = 'timeline_segment';

        // Create entry content
        const entryDiv = document.createElement('div');
        entryDiv.className = 'timeline_entry';

        // Title
        if (entry.title) {
            const titleDiv = document.createElement('div');
            titleDiv.className = 'timeline_segment_title';
            titleDiv.innerHTML = `<h3>${entry.title}</h3>`;
            entryDiv.appendChild(titleDiv);
        }

        // Description
        if (entry.text) {
            const descDiv = document.createElement('div');
            descDiv.className = 'timeline_description';
            descDiv.innerHTML = `<p>${entry.text}</p>`;
            entryDiv.appendChild(descDiv);
        }

        // Media
        if (entry.media && entry.media.length > 0) {
            entry.media.forEach(mediaItem => {
                const mediaDiv = this.createMediaElement(mediaItem);
                entryDiv.appendChild(mediaDiv);
            });
        }

        segmentDiv.appendChild(entryDiv);
        return segmentDiv;
    }

    createMediaElement(media) {
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'timeline_media_container';

        const mediaDiv = document.createElement('div');
        mediaDiv.className = 'timeline_media';

        if (media.type === 'image') {
            // Regular image
            const img = document.createElement('img');
            img.src = media.image;
            img.alt = media.description || '';
            img.className = 'timeline_media_img';
            
            const imgDiv = document.createElement('div');
            imgDiv.className = 'timeline_media_img_text';
            imgDiv.appendChild(img);
            
            if (media.description) {
                const desc = document.createElement('p');
                desc.textContent = media.description;
                imgDiv.appendChild(desc);
            }
            
            mediaDiv.appendChild(imgDiv);
        } else if (media.type === 'youtube') {
            // YouTube video
            const youtubeDiv = this.createYouTubePlayer(media.videoId, media.description);
            mediaDiv.appendChild(youtubeDiv);
        }

        mediaContainer.appendChild(mediaDiv);
        return mediaContainer;
    }

    createYouTubePlayer(videoId, description) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'youtube-player';
        playerDiv.dataset.embed = videoId;

        const thumbnail = document.createElement('img');
        thumbnail.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        thumbnail.alt = description || 'YouTube video thumbnail';

        const playButton = document.createElement('div');
        playButton.className = 'play-button';

        playerDiv.appendChild(thumbnail);
        playerDiv.appendChild(playButton);

        // Add click handler to load YouTube iframe
        playerDiv.addEventListener('click', () => {
            this.loadYouTubeVideo(playerDiv, videoId);
        });

        return playerDiv;
    }

    loadYouTubeVideo(container, videoId) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        
        // Clear container and add iframe
        container.innerHTML = '';
        container.appendChild(iframe);
    }
}

// Initialize timeline when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Timeline();
});