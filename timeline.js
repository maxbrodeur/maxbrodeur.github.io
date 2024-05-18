fetch('./timeline.json')
  .then(response => response.json())
  .then(data => {
    // Select the timeline container
    var timelineContainer = document.getElementById('timeline');
    
    // Loop over the array of years
    data.forEach(function(year, index) {

        // Create a year element
        var yearDiv = document.createElement('div');
        yearDiv.className = 'timeline_year year' + (index + 1);
        yearDiv.innerHTML = `<h2>${year.year}</h2>`;
        timelineContainer.appendChild(yearDiv);

        // Loop over the array of entries for each year
        year.entries.forEach(function(entry, entryIndex) {

            var entryDiv = document.createElement('div');
            entryDiv.className = 'timeline_entry entry' + (entryIndex + 1);
    
            // Create the HTML for the timeline segment
            var segment = document.createElement('div');
            segment.className = 'timeline_segment sgmt' + (entryIndex + 1);
            segment.innerHTML = `
            <div class="timeline_text"> 
            <div class="timeline_segment_title"> <h3>${entry.date}</h3> </div>
            <h4>${entry.title}</h4>
            <p>${entry.text}</p>
            </div>
            `;
            
            // Append the generated HTML to the timeline container
            entryDiv.appendChild(segment);

            mediaDiv = document.createElement('div');
            mediaDiv.className = 'timeline_media_container';
            entryDiv.appendChild(mediaDiv);

            // Loop over the array of media for each entry
            entry.media.forEach(function(mediaItem, mediaIndex) {
                // Create the HTML for the timeline media
                var media = document.createElement('div');
                media.className = 'timeline_media media' + (mediaIndex + 1);

                if (mediaItem.type === "link") {
                    media.innerHTML = `
                    <a class="timeline_media_link" href="${mediaItem.link}">
                    <div class="timeline_media_link_img_wrap">
                    <p class="timeline_media_link_text">${mediaItem.text}</p>
                    <img src="${mediaItem.image}" class="timeline_media_link_img">
                    </div>
                    </a>
                    `;
                } else if (mediaItem.type === "image") {
                    media.innerHTML = `
                    <div class="timeline_media_img_wrap">
                    <img src="${mediaItem.image}" class="timeline_media_img">
                    <p class="timeline_media_img_text">${mediaItem.description}</p>
                    </div>
                    `;
                } else if (mediaItem.type === "iframe") {
                    media.innerHTML = `
                    <div class="youtube-player" data-id="VIDEO_ID" data-thumbnail="${mediaItem.image}">
                    <div class="play-button"></div>
                    </div>
                    `;
                }

                // Append the generated HTML to the timeline container
                mediaDiv.appendChild(media);
            });

            timelineContainer.appendChild(entryDiv);
        });
    });
})
.catch(error => console.error('Error:', error));
