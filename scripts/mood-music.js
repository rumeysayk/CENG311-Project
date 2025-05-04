document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const moodToggle = document.getElementById("moodToggle");
    const moodContainer = document.getElementById("moodContainer");
    const moodSelect = document.getElementById("mood-select");
    const musicBox = document.getElementById("music-box");
    const apiKey = "b04644fd5da0b15d55dab535b2f54b20";
  
    // Hide mood container and song box on initial load
    moodContainer.classList.add("hidden");
    musicBox.style.display = "none";
  
    // Toggle mood selection panel when button is clicked
    moodToggle.addEventListener("click", () => {
      moodContainer.classList.toggle("hidden");
    });
  
    // When a mood is selected
    moodSelect.addEventListener("change", function () {
      const mood = moodSelect.value;
      musicBox.innerHTML = "";
      if (!mood) {
        musicBox.style.display = "none";
        return;
      }
  
      // Show loading indicator
      musicBox.innerHTML = `<p>Loading...</p>`;
      musicBox.style.display = "block";
  
      // 🎵 Manually curated songs for each mood
      const customSongs = {
        love: [
          {
            name: "Love Really Hurts Without You",
            artist: "Billy Ocean",
            url: "https://www.last.fm/music/Billy+Ocean/_/Love+Really+Hurts+Without+You"
          },
          {
            name: "Lover",
            artist: "Taylor Swift",
            url: "https://www.last.fm/music/Taylor+Swift/_/Lover"
          }
        ],
        sad: [
          {
            name: "You're Losing Me",
            artist: "Taylor Swift",
            url: "https://www.last.fm/music/Taylor+Swift/_/You%27re+Losing+Me"
          }
        ],
        happy: [
          {
            name: "22",
            artist: "Taylor Swift",
            url: "https://www.last.fm/music/Taylor+Swift/_/22"
          },
          {
            name: "defnekalbim96",
            artist: "Büyük Ev Ablukada",
            url: "https://www.last.fm/tr/music/B%C3%BCy%C3%BCk+Ev+Ablukada/_/@defne.kalbim96"
          }
        ],
        chill: [
          {
            name: "Lavender Haze",
            artist: "Taylor Swift",
            url: "https://www.last.fm/music/Taylor+Swift/_/Lavender+Haze"
          }
        ],
        angry: [
          {
            name: "Look What You Made Me Do",
            artist: "Taylor Swift",
            url: "https://www.last.fm/music/Taylor+Swift/_/Look+What+You+Made+Me+Do"
          }
        ],
        relax: [
          {
            name: "august",
            artist: "Taylor Swift",
            url: "https://www.last.fm/music/Taylor+Swift/_/august"
          }
        ]
      };
  
      // Get predefined songs for selected mood
      const manualSongs = customSongs[mood] || [];
  
      // For happy and love moods, fetch only 1 song from API; otherwise fetch 2
      const apiLimit = (mood === "happy" || mood === "love") ? 1 : 2;
  
      // Prepare Last.fm API request URL
      const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${mood}&limit=${apiLimit + 3}&api_key=${apiKey}&format=json`;
  
      // Fetch additional songs from Last.fm
      fetch(url)
        .then(res => res.json())
        .then(data => {
          // Filter out duplicates already in manual songs
          const autoSongs = data.tracks.track
            .filter(apiTrack => !manualSongs.some(
              manual => manual.name === apiTrack.name && manual.artist === apiTrack.artist.name
            ))
            .slice(0, apiLimit)
            .map(track => ({
              name: track.name,
              artist: track.artist.name,
              url: track.url
            }));
  
          // Merge manual and API songs
          const allSongs = [...manualSongs, ...autoSongs];
  
          // Create HTML list
          const songsHTML = allSongs.map(song => `
            <li><strong>${song.name}</strong> by ${song.artist}<br>
            <a href="${song.url}" target="_blank">Listen</a></li>
          `).join("");
  
          // Display result
          musicBox.innerHTML = `
            <h3>🎵 Songs for Your Mood</h3>
            <ul>${songsHTML}</ul>
          `;
        })
        .catch(err => {
          musicBox.innerHTML = `<p style="color:red;">Could not load songs.</p>`;
          console.error(err);
        });
    });
  });
  