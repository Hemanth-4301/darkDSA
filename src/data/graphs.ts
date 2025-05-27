import { Question } from "../types";

export const graphsQuestions: Question[] = [
  {
    id: 72,
    title: "Number of Islands",
    description:
      "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    examples: [
      {
        input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        output: "1",
      },
      {
        input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
        output: "3",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int numIslands(char[][] grid) {
    int count = 0;
    int m = grid.length;
    int n = grid[0].length;
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                count++;
                markIsland(grid, i, j);
            }
        }
    }
    
    return count;
}

private void markIsland(char[][] grid, int i, int j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || 
        grid[i][j] != '1') {
        return;
    }
    
    grid[i][j] = '2';  // mark as visited
    
    markIsland(grid, i+1, j);
    markIsland(grid, i-1, j);
    markIsland(grid, i, j+1);
    markIsland(grid, i, j-1);
}`,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(m*n)",
        explanation:
          "We use DFS to mark all connected land cells as visited when we find an unvisited land cell.",
      },
      {
        approach: "Optimal",
        code: `public int numIslands(char[][] grid) {
    if (grid == null || grid.length == 0) return 0;
    
    int count = 0;
    int m = grid.length;
    int n = grid[0].length;
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                count++;
                bfs(grid, i, j);
            }
        }
    }
    
    return count;
}

private void bfs(char[][] grid, int i, int j) {
    Queue<int[]> queue = new LinkedList<>();
    queue.offer(new int[]{i, j});
    grid[i][j] = '0';
    
    int[][] directions = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    
    while (!queue.isEmpty()) {
        int[] curr = queue.poll();
        
        for (int[] dir : directions) {
            int row = curr[0] + dir[0];
            int col = curr[1] + dir[1];
            
            if (row >= 0 && row < grid.length && 
                col >= 0 && col < grid[0].length && 
                grid[row][col] == '1') {
                queue.offer(new int[]{row, col});
                grid[row][col] = '0';
            }
        }
    }
}`,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(min(m,n))",
        explanation:
          "We use BFS to explore all connected land cells. The space complexity is better because we only need to store the frontier of the BFS.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/number-of-islands/",
    difficulty: "Medium",
    category: "graphs",
  },
  {
    id: 73,
    title: "Clone Graph",
    description:
      "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.",
    examples: [
      {
        input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        output: "[[2,4],[1,3],[2,4],[1,3]]",
      },
      {
        input: "adjList = [[]]",
        output: "[[]]",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public Node cloneGraph(Node node) {
    if (node == null) return null;
    
    Map<Node, Node> visited =  new HashMap<>();
    return cloneNode(node, visited);
}

private Node cloneNode(Node node, Map<Node, Node> visited) {
    if (visited.containsKey(node)) {
        return visited.get(node);
    }
    
    Node clone = new Node(node.val);
    visited.put(node, clone);
    
    for (Node neighbor : node.neighbors) {
        clone.neighbors.add(cloneNode(neighbor, visited));
    }
    
    return clone;
}`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        explanation:
          "We use DFS with a HashMap to keep track of cloned nodes to handle cycles in the graph.",
      },
      {
        approach: "Optimal",
        code: `public Node cloneGraph(Node node) {
    if (node == null) return null;
    
    Map<Node, Node> visited = new HashMap<>();
    Queue<Node> queue = new LinkedList<>();
    
    visited.put(node, new Node(node.val));
    queue.offer(node);
    
    while (!queue.isEmpty()) {
        Node curr = queue.poll();
        
        for (Node neighbor : curr.neighbors) {
            if (!visited.containsKey(neighbor)) {
                visited.put(neighbor, new Node(neighbor.val));
                queue.offer(neighbor);
            }
            visited.get(curr).neighbors.add(visited.get(neighbor));
        }
    }
    
    return visited.get(node);
}`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        explanation:
          "We use BFS to traverse the graph. For each node, we create its clone and add cloned neighbors to it.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/clone-graph/",
    difficulty: "Medium",
    category: "graphs",
  },
  {
    id: 74,
    title: "Course Schedule",
    description:
      "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.",
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "true",
        explanation:
          "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.",
      },
      {
        input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        output: "false",
        explanation:
          "There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. This is impossible.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) {
        adj.add(new ArrayList<>());
    }
    
    for (int[] pre : prerequisites) {
        adj.get(pre[1]).add(pre[0]);
    }
    
    boolean[] visited = new boolean[numCourses];
    boolean[] recStack = new boolean[numCourses];
    
    for (int i = 0; i < numCourses; i++) {
        if (hasCycle(i, adj, visited, recStack)) {
            return false;
        }
    }
    
    return true;
}

private boolean hasCycle(int node, List<List<Integer>> adj, 
                        boolean[] visited, boolean[] recStack) {
    if (recStack[node]) return true;
    if (visited[node]) return false;
    
    visited[node] = true;
    recStack[node] = true;
    
    for (int neighbor : adj.get(node)) {
        if (hasCycle(neighbor, adj, visited, recStack)) {
            return true;
        }
    }
    
    recStack[node] = false;
    return false;
}`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        explanation:
          "We use DFS to detect cycles in the directed graph. If there's a cycle, it means some courses can't be completed.",
      },
      {
        approach: "Optimal",
        code: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    int[] inDegree = new int[numCourses];
    
    for (int i = 0; i < numCourses; i++) {
        adj.add(new ArrayList<>());
    }
    
    for (int[] pre : prerequisites) {
        adj.get(pre[1]).add(pre[0]);
        inDegree[pre[0]]++;
    }
    
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) {
            queue.offer(i);
        }
    }
    
    int count = 0;
    while (!queue.isEmpty()) {
        int curr = queue.poll();
        count++;
        
        for (int neighbor : adj.get(curr)) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) {
                queue.offer(neighbor);
            }
        }
    }
    
    return count == numCourses;
}`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        explanation:
          "We use Kahn's algorithm for topological sorting. We keep track of in-degrees and process nodes with zero in-degree first.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/course-schedule/",
    difficulty: "Medium",
    category: "graphs",
  },
  {
    id: 75,
    title: "Pacific Atlantic Water Flow",
    description:
      "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges. The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c). The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can only flow from a cell to an ocean directly if the cell is on the border of the island. Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.",
    examples: [
      {
        input:
          "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
        output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
      },
      {
        input: "heights = [[2,1],[1,2]]",
        output: "[[0,0],[0,1],[1,0],[1,1]]",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public List<List<Integer>> pacificAtlantic(int[][] heights) {
    List<List<Integer>> result = new ArrayList<>();
    if (heights == null || heights.length == 0) return result;
    
    int m = heights.length;
    int n = heights[0].length;
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (canReachBoth(heights, i, j)) {
                result.add(Arrays.asList(i, j));
            }
        }
    }
    
    return result;
}

private boolean canReachBoth(int[][] heights, int i, int j) {
    boolean[][] visited = new boolean[heights.length][heights[0].length];
    return canReachPacific(heights, i, j, visited) && 
           canReachAtlantic(heights, i, j, visited);
}

private boolean canReachPacific(int[][] heights, int i, int j, 
                              boolean[][] visited) {
    if (i == 0 || j == 0) return true;
    visited[i][j] = true;
    
    int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    for (int[] dir : dirs) {
        int ni = i + dir[0];
        int nj = j + dir[1];
        
        if (ni >= 0 && ni < heights.length && nj >= 0 && 
            nj < heights[0].length && !visited[ni][nj] && 
            heights[ni][nj] <= heights[i][j]) {
            if (canReachPacific(heights, ni, nj, visited)) {
                return true;
            }
        }
    }
    
    return false;
}

private boolean canReachAtlantic(int[][] heights, int i, int j, 
                               boolean[][] visited) {
    if (i == heights.length-1 || j == heights[0].length-1) return true;
    visited[i][j] = true;
    
    int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    for (int[] dir : dirs) {
        int ni = i + dir[0];
        int nj = j + dir[1];
        
        if (ni >= 0 && ni < heights.length && nj >= 0 && 
            nj < heights[0].length && !visited[ni][nj] && 
            heights[ni][nj] <= heights[i][j]) {
            if (canReachAtlantic(heights, ni, nj, visited)) {
                return true;
            }
        }
    }
    
    return false;
}`,
        timeComplexity: "O(m*n*(m+n))",
        spaceComplexity: "O(m*n)",
        explanation:
          "For each cell, we check if water can flow to both oceans using DFS.",
      },
      {
        approach: "Optimal",
        code: `public List<List<Integer>> pacificAtlantic(int[][] heights) {
    List<List<Integer>> result = new ArrayList<>();
    if (heights == null || heights.length == 0) return result;
    
    int m = heights.length;
    int n = heights[0].length;
    boolean[][] pacific = new boolean[m][n];
    boolean[][] atlantic = new boolean[m][n];
    
    // DFS from Pacific edges
    for (int i = 0; i < m; i++) {
        dfs(heights, pacific, i, 0, Integer.MIN_VALUE);
    }
    for (int j = 0; j < n; j++) {
        dfs(heights, pacific, 0, j, Integer.MIN_VALUE);
    }
    
    // DFS from Atlantic edges
    for (int i = 0; i < m; i++) {
        dfs(heights, atlantic, i, n-1, Integer.MIN_VALUE);
    }
    for (int j = 0; j < n; j++) {
        dfs(heights, atlantic, m-1, j, Integer.MIN_VALUE);
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

private void dfs(int[][] heights, boolean[][] visited, int i, int j, 
                int prevHeight) {
    if (i < 0 || i >= heights.length || j < 0 || j >= heights[0].length || 
        visited[i][j] || heights[i][j] < prevHeight) {
        return;
    }
    
    visited[i][j] = true;
    
    dfs(heights, visited, i+1, j, heights[i][j]);
    dfs(heights, visited, i-1, j, heights[i][j]);
    dfs(heights, visited, i, j+1, heights[i][j]);
    dfs(heights, visited, i, j-1, heights[i][j]);
}`,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(m*n)",
        explanation:
          "We use DFS from ocean edges inward. This is more efficient because we only need to traverse each cell once for each ocean.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    difficulty: "Medium",
    category: "graphs",
  },
  {
    id: 76,
    title: "Number of Connected Components",
    description:
      "You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph. Return the number of connected components in the graph.",
    examples: [
      {
        input: "n = 5, edges = [[0,1],[1,2],[3,4]]",
        output: "2",
      },
      {
        input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]",
        output: "1",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int countComponents(int n, int[][] edges) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        adj.add(new ArrayList<>());
    }
    
    for (int[] edge : edges) {
        adj.get(edge[0]).add(edge[1]);
        adj.get(edge[1]).add(edge[0]);
    }
    
    boolean[] visited = new boolean[n];
    int components = 0;
    
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            components++;
            dfs(adj, visited, i);
        }
    }
    
    return components;
}

private void dfs(List<List<Integer>> adj, boolean[] visited, int node) {
    visited[node] = true;
    
    for (int neighbor : adj.get(node)) {
        if (!visited[neighbor]) {
            dfs(adj, visited, neighbor);
        }
    }
}`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)",
        explanation:
          "We use DFS to explore each component. Each time we start a new DFS, we've found a new component.",
      },
      {
        approach: "Optimal",
        code: `public int countComponents(int n, int[][] edges) {
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) {
        parent[i] = i;
    }
    
    int components = n;
    
    for (int[] edge : edges) {
        int p1 = find(parent, edge[0]);
        int p2 = find(parent, edge[1]);
        
        if (p1 != p2) {
            parent[p1] = p2;
            components--;
        }
    }
    
    return components;
}

private int find(int[] parent, int node) {
    while (parent[node] != node) {
        parent[node] = parent[parent[node]];  // path compression
        node = parent[node];
    }
    return node;
}`,
        timeComplexity: "O(N * α(N))",
        spaceComplexity: "O(N)",
        explanation:
          "We use Union-Find with path compression. Each time we connect two components, we decrease the count of components by 1.",
      },
    ],
    leetCodeUrl:
      "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
    difficulty: "Medium",
    category: "graphs",
  },
  {
    id: 77,
    title: "Graph Valid Tree",
    description:
      "Given n nodes labeled from 0 to n-1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.",
    examples: [
      {
        input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
        output: "true",
      },
      {
        input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
        output: "false",
        explanation: "The graph has a cycle.",
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean validTree(int n, int[][] edges) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        adj.add(new ArrayList<>());
    }
    
    for (int[] edge : edges) {
        adj.get(edge[0]).add(edge[1]);
        adj.get(edge[1]).add(edge[0]);
    }
    
    boolean[] visited = new boolean[n];
    
    // Check if graph has cycle and is connected
    if (hasCycle(adj, visited, 0, -1)) {
        return false;
    }
    
    // Check if all nodes are visited (connected)
    for (boolean v : visited) {
        if (!v) return false;
    }
    
    return true;
}

private boolean hasCycle(List<List<Integer>> adj, boolean[] visited, 
                        int node, int parent) {
    visited[node] = true;
    
    for (int neighbor : adj.get(node)) {
        if (!visited[neighbor]) {
            if (hasCycle(adj, visited, neighbor, node)) {
                return true;
            }
        } else if (neighbor != parent) {
            return true;
        }
    }
    
    return false;
}`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)",
        explanation:
          "We use DFS to check for cycles and connectivity. A valid tree must be connected and acyclic.",
      },
      {
        approach: "Optimal",
        code: `public boolean validTree(int n, int[][] edges) {
    if (edges.length != n - 1) return false;
    
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) {
        parent[i] = i;
    }
    
    for (int[] edge : edges) {
        int p1 = find(parent, edge[0]);
        int p2 = find(parent, edge[1]);
        
        if (p1 == p2) return false;
        parent[p1] = p2;
    }
    
    return true;
}

private int find(int[] parent, int node) {
    while (parent[node] != node) {
        parent[node] = parent[parent[node]];
        node = parent[node];
    }
    return node;
}`,
        timeComplexity: "O(N * α(N))",
        spaceComplexity: "O(N)",
        explanation:
          "We use Union-Find. A tree must have exactly n-1 edges and no cycles. We check for cycles using Union-Find.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/graph-valid-tree/",
    difficulty: "Medium",
    category: "graphs",
  },
  {
    id: 78,
    title: "Word Ladder",
    description:
      "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: Every adjacent pair of words differs by a single letter, and every si for 1 <= i <= k is in wordList. Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
    examples: [
      {
        input:
          'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: "5",
        explanation:
          'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.',
      },
      {
        input:
          'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
        output: "0",
        explanation:
          'The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.',
      },
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int ladderLength(String beginWord, String endWord, 
                           List<String> wordList) {
    Set<String> dict = new HashSet<>(wordList);
    if (!dict.contains(endWord)) return 0;
    
    Queue<String> queue = new LinkedList<>();
    queue.offer(beginWord);
    int level = 1;
    
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            String curr = queue.poll();
            char[] word = curr.toCharArray();
            
            for (int j = 0; j < word.length; j++) {
                char original = word[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    word[j] = c;
                    String newWord = new String(word);
                    
                    if (newWord.equals(endWord)) return level + 1;
                    
                    if (dict.contains(newWord)) {
                        queue.offer(newWord);
                        dict.remove(newWord);
                    }
                }
                word[j] = original;
            }
        }
        level++;
    }
    
    return 0;
}`,
        timeComplexity:
          "O(26 * N * W) where N is word length and W is dictionary size",
        spaceComplexity: "O(W)",
        explanation:
          "We use BFS to try all possible one-letter transformations at each step.",
      },
      {
        approach: "Optimal",
        code: `public int ladderLength(String beginWord, String endWord, 
                           List<String> wordList) {
    Set<String> dict = new HashSet<>(wordList);
    if (!dict.contains(endWord)) return 0;
    
    Set<String> beginSet = new HashSet<>();
    Set<String> endSet = new HashSet<>();
    beginSet.add(beginWord);
    endSet.add(endWord);
    
    int level = 1;
    Set<String> visited = new HashSet<>();
    
    while (!beginSet.isEmpty() && !endSet.isEmpty()) {
        if (beginSet.size() > endSet.size()) {
            Set<String> temp = beginSet;
            beginSet = endSet;
            endSet = temp;
        }
        
        Set<String> temp = new HashSet<>();
        for (String word : beginSet) {
            char[] chs = word.toCharArray();
            
            for (int i = 0; i < chs.length; i++) {
                char old = chs[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    chs[i] = c;
                    String target = String.valueOf(chs);
                    
                    if (endSet.contains(target)) {
                        return level + 1;
                    }
                    
                    if (!visited.contains(target) && dict.contains(target)) {
                        temp.add(target);
                        visited.add(target);
                    }
                }
                chs[i] = old;
            }
        }
        
        beginSet = temp;
        level++;
    }
    
    return 0;
}`,
        timeComplexity: "O(26 * N * W)",
        spaceComplexity: "O(W)",
        explanation:
          "We use bidirectional BFS, starting from both beginWord and endWord. This reduces the search space significantly.",
      },
    ],
    leetCodeUrl: "https://leetcode.com/problems/word-ladder/",
    difficulty: "Hard",
    category: "graphs",
  },
];
