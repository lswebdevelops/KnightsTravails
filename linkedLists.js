
class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
  }
}

class Graph {
  constructor(size = 8) {
    // Create nodes for each square on the chessboard
    this.nodes = [];
    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < size; j += 1) {
        const node = new Node(i, j);
        this.nodes.push(node);
      }
    }

    // Connect nodes based on knight's move pattern
    for (let node of this.nodes) {
      const { x, y } = node;
      const directions = [
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
        [-2, 1],
        [-1, 2],
      ];
      for (let [dx, dy] of directions) {
        const neighborX = x + dx;
        const neighborY = y + dy;
        if (
          neighborX >= 0 &&
          neighborX < size &&
          neighborY >= 0 &&
          neighborY < size
        ) {
          const neighbor = this.nodes[neighborX * size + neighborY];
          node.neighbors.push(neighbor);
        }
      }
    }
  }

  bfs(start, end) {
    const visited = new Set();
    const queue = [];
    queue.push([start, [start]]);
    while (queue.length > 0) {
      let [current, path] = queue.shift();
      visited.add(current);
      if (current.x === end.x && current.y === end.y) {
        return path;
      }
      for (let neighbor of current.neighbors) {
        if (!visited.has(neighbor)) {
          queue.push([neighbor, [...path, neighbor]]);
        }
      }
    }
    return null; // No path found
  }

  knightMoves(start, end) {
    const size = 8; // added missing variable declaration
    const startNode = this.nodes[start.x * size + start.y];
    const endNode = this.nodes[end.x * size + end.y];
    const path = this.bfs(startNode, endNode);
    if (path) {
      console.log(
        `Fastest Routes from ${start.x},${start.y} to ${end.x},${end.y}`
      );
      path.forEach((node) => console.log(`${node.x},${node.y}`));
    } else {
      console.log(
        `No routes from ${start.x},${start.y} to ${end.x},${end.y}`
      );
    }
  }
}

const g = new Graph();
g.knightMoves({ x: 0, y: 0 }, { x: 1, y: 2 });
g.knightMoves({ x: 3, y: 1 }, { x: 2, y: 2 });
g.knightMoves({ x: 7, y: 7 }, { x: 7, y: 6 });
