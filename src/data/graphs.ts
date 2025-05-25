import { Question } from "../types";

export const graphQuestions: Question[] = [
  {
    id: "number-of-islands",
    title: "Number of Islands",
    description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    difficulty: "Medium",
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
    examples: [
      {
        input: 'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
        output: "1"
      },
      {
        input: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
        output: "3"
      }
    ],
    bruteForceSolution: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        
        int m = grid.length;
        int n = grid[0].length;
        boolean[][] visited = new boolean[m][n];
        int islands = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1' && !visited[i][j]) {
                    bfs(grid, i, j, visited);
                    islands++;
                }
            }
        }
        
        return islands;
    }
    
    private void bfs(char[][] grid, int row, int col, boolean[][] visited) {
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{row, col});
        visited[row][col] = true;
        
        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int r = current[0], c = current[1];
            
            for (int[] dir : directions) {
                int newR = r + dir[0];
                int newC = c + dir[1];
                
                if (newR >= 0 && newR < grid.length && newC >= 0 && newC < grid[0].length &&
                    grid[newR][newC] == '1' && !visited[newR][newC]) {
                    visited[newR][newC] = true;
                    queue.offer(new int[]{newR, newC});
                }
            }
        }
    }
}`,
    optimalSolution: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        
        int islands = 0;
        
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    dfs(grid, i, j);
                    islands++;
                }
            }
        }
        
        return islands;
    }
    
    private void dfs(char[][] grid, int row, int col) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length ||
            grid[row][col] != '1') {
            return;
        }
        
        grid[row][col] = '0'; // Mark as visited
        
        dfs(grid, row + 1, col);
        dfs(grid, row - 1, col);
        dfs(grid, row, col + 1);
        dfs(grid, row, col - 1);
    }
}`,
    bruteForceComplexity: {
      time: "O(m * n)",
      space: "O(m * n)",
      reasoning: "BFS visits each cell once, queue and visited array require extra space."
    },
    optimalComplexity: {
      time: "O(m * n)",
      space: "O(min(m, n))",
      reasoning: "DFS modifies grid in-place, recursion stack depth limited by grid dimensions."
    },
    leetcodeUrl: "https://leetcode.com/problems/number-of-islands/"
  },
  {
    id: "clone-graph",
    title: "Clone Graph",
    description: "Given a reference of a node in a connected undirected graph.\n\nReturn a deep copy (clone) of the graph.\n\nEach node in the graph contains a value (int) and a list (List[Node]) of its neighbors.",
    difficulty: "Medium",
    tags: ["Hash Table", "Depth-First Search", "Breadth-First Search", "Graph"],
    examples: [
      {
        input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        output: "[[2,4],[1,3],[2,4],[1,3]]",
        explanation: "There are 4 nodes in the graph.\n1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).\n2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).\n3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).\n4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3)."
      }
    ],
    bruteForceSolution: `class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        
        // First pass: collect all nodes using BFS
        Set<Node> visited = new HashSet<>();
        Queue<Node> queue = new LinkedList<>();
        queue.offer(node);
        visited.add(node);
        
        while (!queue.isEmpty()) {
            Node current = queue.poll();
            for (Node neighbor : current.neighbors) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        
        // Second pass: create cloned nodes
        Map<Node, Node> cloneMap = new HashMap<>();
        for (Node original : visited) {
            cloneMap.put(original, new Node(original.val));
        }
        
        // Third pass: set up neighbors
        for (Node original : visited) {
            Node cloned = cloneMap.get(original);
            for (Node neighbor : original.neighbors) {
                cloned.neighbors.add(cloneMap.get(neighbor));
            }
        }
        
        return cloneMap.get(node);
    }
}`,
    optimalSolution: `class Solution {
    private Map<Node, Node> cloneMap = new HashMap<>();
    
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        
        if (cloneMap.containsKey(node)) {
            return cloneMap.get(node);
        }
        
        Node cloned = new Node(node.val);
        cloneMap.put(node, cloned);
        
        for (Node neighbor : node.neighbors) {
            cloned.neighbors.add(cloneGraph(neighbor));
        }
        
        return cloned;
    }
}`,
    bruteForceComplexity: {
      time: "O(V + E)",
      space: "O(V)",
      reasoning: "Three passes through graph: collect nodes, create clones, set neighbors."
    },
    optimalComplexity: {
      time: "O(V + E)",
      space: "O(V)",
      reasoning: "Single DFS pass, each node and edge visited once, HashMap for clones."
    },
    leetcodeUrl: "https://leetcode.com/problems/clone-graph/"
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\nFor example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.\n\nReturn true if you can finish all courses. Otherwise, return false.",
    difficulty: "Medium",
    tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"],
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "true",
        explanation: "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible."
      },
      {
        input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        output: "false",
        explanation: "There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible."
      }
    ],
    bruteForceSolution: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Build adjacency list
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            graph.add(new ArrayList<>());
        }
        
        for (int[] prereq : prerequisites) {
            graph.get(prereq[1]).add(prereq[0]);
        }
        
        // Check for cycle using DFS from each node
        for (int i = 0; i < numCourses; i++) {
            boolean[] visited = new boolean[numCourses];
            boolean[] recStack = new boolean[numCourses];
            
            if (hasCycle(graph, i, visited, recStack)) {
                return false;
            }
        }
        
        return true;
    }
    
    private boolean hasCycle(List<List<Integer>> graph, int node, 
                           boolean[] visited, boolean[] recStack) {
        if (recStack[node]) return true;
        if (visited[node]) return false;
        
        visited[node] = true;
        recStack[node] = true;
        
        for (int neighbor : graph.get(node)) {
            if (hasCycle(graph, neighbor, visited, recStack)) {
                return true;
            }
        }
        
        recStack[node] = false;
        return false;
    }
}`,
    optimalSolution: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Build adjacency list
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            graph.add(new ArrayList<>());
        }
        
        for (int[] prereq : prerequisites) {
            graph.get(prereq[1]).add(prereq[0]);
        }
        
        int[] color = new int[numCourses]; // 0: white, 1: gray, 2: black
        
        for (int i = 0; i < numCourses; i++) {
            if (color[i] == 0 && hasCycle(graph, i, color)) {
                return false;
            }
        }
        
        return true;
    }
    
    private boolean hasCycle(List<List<Integer>> graph, int node, int[] color) {
        if (color[node] == 1) return true; // Gray node - cycle detected
        if (color[node] == 2) return false; // Black node - already processed
        
        color[node] = 1; // Mark as gray (visiting)
        
        for (int neighbor : graph.get(node)) {
            if (hasCycle(graph, neighbor, color)) {
                return true;
            }
        }
        
        color[node] = 2; // Mark as black (finished)
        return false;
    }
}`,
    bruteForceComplexity: {
      time: "O(V * (V + E))",
      space: "O(V + E)",
      reasoning: "Run DFS from each vertex independently, each DFS takes O(V + E)."
    },
    optimalComplexity: {
      time: "O(V + E)",
      space: "O(V + E)",
      reasoning: "Single DFS traversal using three-color approach, each node visited once."
    },
    leetcodeUrl: "https://leetcode.com/problems/course-schedule/"
  },
  {
    id: "pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    description: "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.\n\nThe island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).\n\nThe island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into that ocean.\n\nReturn a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.",
    difficulty: "Medium",
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Matrix"],
    examples: [
      {
        input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
        output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]"
      }
    ],
    bruteForceSolution: `class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        List<List<Integer>> result = new ArrayList<>();
        int m = heights.length;
        int n = heights[0].length;
        
        // Check each cell individually
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                boolean[] canReachOceans = new boolean[2]; // [pacific, atlantic]
                boolean[][] visited = new boolean[m][n];
                
                dfs(heights, i, j, visited, canReachOceans);
                
                if (canReachOceans[0] && canReachOceans[1]) {
                    result.add(Arrays.asList(i, j));
                }
            }
        }
        
        return result;
    }
    
    private void dfs(int[][] heights, int row, int col, boolean[][] visited, boolean[] canReachOceans) {
        int m = heights.length;
        int n = heights[0].length;
        
        if (visited[row][col]) return;
        visited[row][col] = true;
        
        // Check if reached Pacific (top or left edge)
        if (row == 0 || col == 0) {
            canReachOceans[0] = true;
        }
        
        // Check if reached Atlantic (bottom or right edge)
        if (row == m - 1 || col == n - 1) {
            canReachOceans[1] = true;
        }
        
        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        
        for (int[] dir : directions) {
            int newRow = row + dir[0];
            int newCol = col + dir[1];
            
            if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n &&
                !visited[newRow][newCol] && heights[newRow][newCol] <= heights[row][col]) {
                dfs(heights, newRow, newCol, visited, canReachOceans);
            }
        }
    }
}`,
    optimalSolution: `class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        List<List<Integer>> result = new ArrayList<>();
        int m = heights.length;
        int n = heights[0].length;
        
        boolean[][] pacific = new boolean[m][n];
        boolean[][] atlantic = new boolean[m][n];
        
        // DFS from Pacific edges (top and left)
        for (int i = 0; i < m; i++) {
            dfs(heights, i, 0, pacific, heights[i][0]);
        }
        for (int j = 0; j < n; j++) {
            dfs(heights, 0, j, pacific, heights[0][j]);
        }
        
        // DFS from Atlantic edges (bottom and right)
        for (int i = 0; i < m; i++) {
            dfs(heights, i, n - 1, atlantic, heights[i][n - 1]);
        }
        for (int j = 0; j < n; j++) {
            dfs(heights, m - 1, j, atlantic, heights[m - 1][j]);
        }
        
        // Find cells that can reach both oceans
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (pacific[i][j] && atlantic[i][j]) {
                    result.add(Arrays.asList(i, j));
                }
            }
        }
        
        return result;
    }
    
    private void dfs(int[][] heights, int row, int col, boolean[][] reachable, int prevHeight) {
        int m = heights.length;
        int n = heights[0].length;
        
        if (row < 0 || row >= m || col < 0 || col >= n ||
            reachable[row][col] || heights[row][col] < prevHeight) {
            return;
        }
        
        reachable[row][col] = true;
        
        dfs(heights, row + 1, col, reachable, heights[row][col]);
        dfs(heights, row - 1, col, reachable, heights[row][col]);
        dfs(heights, row, col + 1, reachable, heights[row][col]);
        dfs(heights, row, col - 1, reachable, heights[row][col]);
    }
}`,
    bruteForceComplexity: {
      time: "O(m * n * m * n)",
      space: "O(m * n)",
      reasoning: "For each cell, run DFS that may visit all cells in worst case."
    },
    optimalComplexity: {
      time: "O(m * n)",
      space: "O(m * n)",
      reasoning: "DFS from ocean edges, each cell visited at most twice (once per ocean)."
    },
    leetcodeUrl: "https://leetcode.com/problems/pacific-atlantic-water-flow/"
  },
  {
    id: "number-of-connected-components-in-an-undirected-graph",
    title: "Number of Connected Components in an Undirected Graph",
    description: "You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.\n\nReturn the number of connected components in the graph.",
    difficulty: "Medium",
    tags: ["Depth-First Search", "Breadth-First Search", "Union Find", "Graph"],
    examples: [
      {
        input: "n = 5, edges = [[0,1],[1,2],[3,4]]",
        output: "2"
      },
      {
        input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]",
        output: "1"
      }
    ],
    bruteForceSolution: `class Solution {
    public int countComponents(int n, int[][] edges) {
        // Build adjacency list
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        
        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
            graph.get(edge[1]).add(edge[0]);
        }
        
        boolean[] visited = new boolean[n];
        int components = 0;
        
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                bfs(graph, i, visited);
                components++;
            }
        }
        
        return components;
    }
    
    private void bfs(List<List<Integer>> graph, int start, boolean[] visited) {
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(start);
        visited[start] = true;
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            
            for (int neighbor : graph.get(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
    }
}`,
    optimalSolution: `class Solution {
    public int countComponents(int n, int[][] edges) {
        UnionFind uf = new UnionFind(n);
        
        for (int[] edge : edges) {
            uf.union(edge[0], edge[1]);
        }
        
        return uf.getComponents();
    }
    
    class UnionFind {
        private int[] parent;
        private int[] rank;
        private int components;
        
        public UnionFind(int n) {
            parent = new int[n];
            rank = new int[n];
            components = n;
            
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }
        
        public int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }
        
        public boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX != rootY) {
                // Union by rank
                if (rank[rootX] < rank[rootY]) {
                    parent[rootX] = rootY;
                } else if (rank[rootX] > rank[rootY]) {
                    parent[rootY] = rootX;
                } else {
                    parent[rootY] = rootX;
                    rank[rootX]++;
                }
                components--;
                return true;
            }
            return false;
        }
        
        public int getComponents() {
            return components;
        }
    }
}`,
    bruteForceComplexity: {
      time: "O(V + E)",
      space: "O(V + E)",
      reasoning: "DFS/BFS visits each vertex and edge once, adjacency list takes O(V + E) space."
    },
    optimalComplexity: {
      time: "O(E * α(V))",
      space: "O(V)",
      reasoning: "Union-Find with path compression and union by rank, α is inverse Ackermann function."
    },
    leetcodeUrl: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
  },
  {
    id: "graph-valid-tree",
    title: "Graph Valid Tree",
    description: "You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.\n\nReturn true if the edges of the given graph make up a valid tree, and false otherwise.",
    difficulty: "Medium",
    tags: ["Depth-First Search", "Breadth-First Search", "Union Find", "Graph"],
    examples: [
      {
        input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
        output: "true"
      },
      {
        input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
        output: "false"
      }
    ],
    bruteForceSolution: `class Solution {
    public boolean validTree(int n, int[][] edges) {
        // A tree must have exactly n-1 edges
        if (edges.length != n - 1) return false;
        
        // Build adjacency list
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        
        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
            graph.get(edge[1]).add(edge[0]);
        }
        
        // Check if graph is connected and has no cycles
        boolean[] visited = new boolean[n];
        
        if (hasCycle(graph, 0, -1, visited)) {
            return false;
        }
        
        // Check if all nodes are connected
        for (boolean v : visited) {
            if (!v) return false;
        }
        
        return true;
    }
    
    private boolean hasCycle(List<List<Integer>> graph, int node, int parent, boolean[] visited) {
        visited[node] = true;
        
        for (int neighbor : graph.get(node)) {
            if (neighbor == parent) continue;
            
            if (visited[neighbor] || hasCycle(graph, neighbor, node, visited)) {
                return true;
            }
        }
        
        return false;
    }
}`,
    optimalSolution: `class Solution {
    public boolean validTree(int n, int[][] edges) {
        // A tree must have exactly n-1 edges
        if (edges.length != n - 1) return false;
        
        UnionFind uf = new UnionFind(n);
        
        for (int[] edge : edges) {
            // If union returns false, it means there's a cycle
            if (!uf.union(edge[0], edge[1])) {
                return false;
            }
        }
        
        // Check if all nodes are connected (should have 1 component)
        return uf.getComponents() == 1;
    }
    
    class UnionFind {
        private int[] parent;
        private int[] rank;
        private int components;
        
        public UnionFind(int n) {
            parent = new int[n];
            rank = new int[n];
            components = n;
            
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }
        
        public int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }
        
        public boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX == rootY) {
                return false; // Cycle detected
            }
            
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
            
            components--;
            return true;
        }
        
        public int getComponents() {
            return components;
        }
    }
}`,
    bruteForceComplexity: {
      time: "O(V + E)",
      space: "O(V + E)",
      reasoning: "DFS to detect cycles and check connectivity, adjacency list storage."
    },
    optimalComplexity: {
      time: "O(E * α(V))",
      space: "O(V)",
      reasoning: "Union-Find operations with path compression, α is inverse Ackermann function."
    },
    leetcodeUrl: "https://leetcode.com/problems/graph-valid-tree/"
  },
  {
    id: "word-ladder",
    title: "Word Ladder",
    description: "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:\n\n- Every adjacent pair of words differs by a single letter.\n- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.\n- sk == endWord\n\nGiven two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
    difficulty: "Hard",
    tags: ["Hash Table", "String", "Breadth-First Search"],
    examples: [
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: "5",
        explanation: 'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.'
      },
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
        output: "0",
        explanation: 'The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.'
      }
    ],
    bruteForceSolution: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;
        
        Queue<String> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        queue.offer(beginWord);
        visited.add(beginWord);
        
        int level = 1;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            
            for (int i = 0; i < size; i++) {
                String current = queue.poll();
                
                if (current.equals(endWord)) {
                    return level;
                }
                
                // Try all possible one-letter changes
                for (String word : wordList) {
                    if (!visited.contains(word) && isOneLetterDiff(current, word)) {
                        visited.add(word);
                        queue.offer(word);
                    }
                }
            }
            
            level++;
        }
        
        return 0;
    }
    
    private boolean isOneLetterDiff(String word1, String word2) {
        if (word1.length() != word2.length()) return false;
        
        int diff = 0;
        for (int i = 0; i < word1.length(); i++) {
            if (word1.charAt(i) != word2.charAt(i)) {
                diff++;
                if (diff > 1) return false;
            }
        }
        
        return diff == 1;
    }
}`,
    optimalSolution: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;
        
        Queue<String> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        queue.offer(beginWord);
        visited.add(beginWord);
        
        int level = 1;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            
            for (int i = 0; i < size; i++) {
                String current = queue.poll();
                
                if (current.equals(endWord)) {
                    return level;
                }
                
                // Try all possible one-letter changes
                char[] chars = current.toCharArray();
                for (int j = 0; j < chars.length; j++) {
                    char original = chars[j];
                    
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        
                        chars[j] = c;
                        String newWord = new String(chars);
                        
                        if (wordSet.contains(newWord) && !visited.contains(newWord)) {
                            visited.add(newWord);
                            queue.offer(newWord);
                        }
                    }
                    
                    chars[j] = original; // Restore
                }
            }
            
            level++;
        }
        
        return 0;
    }
}`,
    bruteForceComplexity: {
      time: "O(M² * N)",
      space: "O(M * N)",
      reasoning: "For each word, compare with all words in list, M is word length, N is word count."
    },
    optimalComplexity: {
      time: "O(M² * N)",
      space: "O(M * N)",
      reasoning: "Generate all possible transformations (26*M per word), but avoid full word list comparison."
    },
    leetcodeUrl: "https://leetcode.com/problems/word-ladder/"
  }
];
