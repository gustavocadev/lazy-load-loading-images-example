import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div id="images"></div>
`;

const images = document.getElementById('images');

const getImages = async (quantityOfImages: number) => {
  const resp = await fetch(
    `https://picsum.photos/v2/list?page=2&limit=${quantityOfImages}`
  );
  const data = await resp.json();
  return data;
};

const createImage = (src: string) => {
  const img = document.createElement('img');
  img.src = src;
  return img;
};

const renderImages = async (increment: number) => {
  const fragment = document.createDocumentFragment();
  const data = await getImages(increment);
  data.forEach((img: any) => {
    fragment.appendChild(createImage(img.download_url));
  });

  images!.appendChild(fragment);
  setObserver();
};

let counter = 5;
const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      renderImages(counter);
      counter += 5;
    }
    console.log(entry);
  });
};

const setObserver = () => {
  const options = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(callback, options);

  observer.observe(images?.lastElementChild!);
};

await renderImages(counter);
