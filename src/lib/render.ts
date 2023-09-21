import { Food, Map, Player } from "@/services/connectMatch";

export const renderPlayer = (
  ctx: CanvasRenderingContext2D,
  map: Map,
  player: Player
) => {
  const tileWidth = ctx.canvas.width / map.tiles.horizontal;
  const tileHeight = ctx.canvas.height / map.tiles.vertical;
  const body = player.body.toReversed();

  body.forEach((bodyFragment) => {
    ctx.beginPath();
    ctx.rect(
      bodyFragment.x * tileWidth,
      bodyFragment.y * tileHeight,
      tileWidth,
      tileHeight
    );
    ctx.fill();
  });
};

export const renderFood = (
  ctx: CanvasRenderingContext2D,
  map: Map,
  food: Food
) => {
  const tileWidth = ctx.canvas.width / map.tiles.horizontal;
  const tileHeight = ctx.canvas.height / map.tiles.vertical;

  ctx.beginPath();
  ctx.fillStyle = "#ff0000";
  ctx.arc(
    tileWidth * food.position.x + tileWidth / 2,
    tileHeight * food.position.y + tileHeight / 2,
    Math.min(tileWidth, tileHeight) / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();
};
