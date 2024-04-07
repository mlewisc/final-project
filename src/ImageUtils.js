import burger from "./images/burger.svg";
import popcorn from "./images/popcorn.svg";
import fries from "./images/fries.svg";
import donut from "./images/donut.svg";
import apple from "./images/apple.svg";
import avocado from "./images/avocado.svg";
import salad from "./images/salad.svg";
import cake from "./images/cake.svg";
import icecream from "./images/icecream.svg";
import orange from "./images/orange.svg";

const images = [
  burger,
  popcorn,
  donut,
  icecream,
  fries,
  apple,
  avocado,
  orange,
  salad,
  cake,
];

const altTexts = [
  "3d illustration of a burger",
  "3d illustration of a popcorn cup with red and white stripes",
  "illustration of a pink donuts with sprinkles",
  "3d illustration of 3 balls of icecream with chocolate syrup on a white cup",
  "illustration of fries on a red bag",
  "3d illustration of a red apple",
  "3d illustration of a slided avocado and and a full one",
  "3d illustration of an orange",
  "illustration of a blue bowl with green leaves and sliced tomato",
  "3d illustration of a slide of cake with white and black batter",
];

export default function imagesAndAlt() {
  let imageAndAlt = [];

  for (let i = 0; i < 10; i++) {
    const imageDetail = [images[i], altTexts[i]];

    imageAndAlt.push(imageDetail);
  }
  return imageAndAlt;
}
