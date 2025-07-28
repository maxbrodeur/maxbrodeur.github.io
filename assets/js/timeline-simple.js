// Simplified Timeline JavaScript

class Timeline {
    constructor() {
        this.timelineData = [
            {
                year: "2025",
                title: "Max Planck Institute for Brain Research",
                description: "Student researcher in the Neural Systems Department led by Gilles Laurent, working on connectomics and neural computation.",
                location: "Frankfurt am Main, Germany"
            },
            {
                year: "2024",
                title: "EPFL",
                description: "Master's in Computational Science & Engineering. Research in knot theory, mathematical optimization, and machine learning.",
                location: "Lausanne, Switzerland"
            },
            {
                year: "2024",
                title: "Smooth Rolling Knots",
                description: "Published research on knot theory and topology at Bridges Mathematical Art Conference. Investigation of smooth rolling motions and geometric constraints.",
                location: "Mathematical research"
            },
            {
                year: "2023",
                title: "Ubisoft Montréal",
                description: "Second internship with the \"bots\" team. Worked on foundation models for NPC navigation tasks.",
                location: "Montréal, Canada"
            },
            {
                year: "2023",
                title: "McGill University",
                description: "BSc Mathematics & Computer Science (2019-2023). Graduated with distinction.",
                location: "Montréal, Canada"
            },
            {
                year: "2022",
                title: "Ubisoft Montréal",
                description: "Research internship with the Reinforcement Learning team. Worked on a constrained RL implementation for self driving cars in AAA video games. (<a href=\"https://montreal.ubisoft.com/en/constrained-reinforcement-learning-and-self-driving-cars-an-interns-journey/\">link to blog post</a>)",
                location: "Montréal, Canada"
            },
            {
                year: "2021",
                title: "Ubisoft Montréal",
                description: "Developed high resolution facial mesh manipulation tools with the <a href=\"https://montreal.ubisoft.com/en/using-ml-and-complex-math-to-deconstruct-and-reconstruct-human-faces/\">Faceshifter team</a>.",
                location: "Montréal, Canada"
            },
            {
                year: "2020",
                title: "Camp Découverte Techno",
                description: "Converted our material to an online format due to the pandemic. We still managed to have fun!",
                location: "Virtual programming camp"
            },
            {
                year: "2019",
                title: "Camp Découverte Techno",
                description: "Developed and taught week-long day camp courses on various Computer Science topics for kids aged 11-16.",
                location: "Montréal, Canada"
            },
            {
                year: "2017-2019",
                title: "Collège de Maisonneuve",
                description: "DEC Mathematics & Computer Science (2017-2019). Foundation in pure mathematics and programming.",
                location: "Montréal, Canada"
            }
        ];
    }

    render() {
        const timelineContainer = document.getElementById('timeline');
        if (!timelineContainer) return;

        timelineContainer.innerHTML = '';

        this.timelineData.forEach(item => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            timelineItem.innerHTML = `
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-description">${item.description}</div>
                <div class="timeline-location">${item.location}</div>
            `;
            
            timelineContainer.appendChild(timelineItem);
        });
    }
}

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const timeline = new Timeline();
    timeline.render();
});

// Also try to initialize immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const timeline = new Timeline();
        timeline.render();
    });
} else {
    const timeline = new Timeline();
    timeline.render();
}
