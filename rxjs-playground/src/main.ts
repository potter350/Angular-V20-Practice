import './style.css'
import { debounceTime, filter, fromEvent, map, switchMap, tap, } from 'rxjs';


const inputEl = document.getElementById('search') as HTMLInputElement;
const resultsEl = document.getElementById('results') as HTMLUListElement;
const playerEl = document.getElementById('player') as HTMLIFrameElement;

const API_KEY = 'AIzaSyCpVLubxyDTn2x-M4Sfy45Cge8fClquhKg'

function fetchVideo(query: string): Promise<[]> {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=5&key=${API_KEY}`;
   return fetch(url)
   .then(res => res.json())
   .then(res => res.items || [])
  
}

function renderResults(videos: any[]) {
  resultsEl.innerHTML = '';
  videos.forEach(video => {
    const li = document.createElement('li');
    li.textContent = video.snippet.title;
    li.onclick = () => {
      const videoId = video.id.videoId;
      playerEl.src = `https://www.youtube.com/embed/${videoId}`;
    };
    resultsEl.appendChild(li);
  });
}


//getting searchinput
fromEvent(inputEl, 'input').pipe(
  debounceTime(200),
  map((event) => (event.target as HTMLInputElement).value),
  tap((value) => {
      if(value == ''){
         resultsEl.innerHTML = '';
         return playerEl.src = ''
      }
  }),
  filter((value)=> value !== ''),
  switchMap((value) => fetchVideo(value))
).subscribe(renderResults)



