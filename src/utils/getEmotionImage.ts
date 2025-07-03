import ecstatic from "../assets/ecstatic.png";
import grateful from "../assets/grateful.png";
import proud from "../assets/proud.png";
import content from "../assets/content.png";
import neutral from "../assets/neutral.png";
import tired from "../assets/tired.png";
import sad from "../assets/sad.png";
import frustrated from "../assets/frustrated.png";
import furious from "../assets/furious.png";

export function getEmotionImage(emotionId: number): string | null {
  switch (emotionId) {
    case 1:
      return ecstatic;
    case 2:
      return grateful;
    case 3:
      return proud;
    case 4:
      return content;
    case 5:
      return neutral;
    case 6:
      return tired;
    case 7:
      return sad;
    case 8:
      return frustrated;
    case 9:
      return furious;
    default:
      return null;
  }
}
