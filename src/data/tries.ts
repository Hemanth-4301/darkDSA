import { Question } from "./types";

export const trieQuestions: Question[] = [
  {
    id: "implement-trie-prefix-tree",
    title: "Implement Trie (Prefix Tree)",
    description: "A trie (pronounced as \"try\") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.\n\nImplement the Trie class:\n\n- Trie() Initializes the trie object.\n- void insert(String word) Inserts the string word into the trie.\n- boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.\n- boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Design", "Trie"],
    examples: [
      {
        input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]',
        output: '[null, null, true, false, true, null, true]',
        explanation: 'Trie trie = new Trie();\ntrie.insert("apple");\ntrie.search("apple");   // return True\ntrie.search("app");     // return False\ntrie.startsWith("app"); // return True\ntrie.insert("app");\ntrie.search("app");     // return True'
      }
    ],
    bruteForceSolution: `class Trie {
    private Set<String> words;
    
    public Trie() {
        words = new HashSet<>();
    }
    
    public void insert(String word) {
        words.add(word);
    }
    
    public boolean search(String word) {
        return words.contains(word);
    }
    
    public boolean startsWith(String prefix) {
        for (String word : words) {
            if (word.startsWith(prefix)) {
                return true;
            }
        }
        return false;
    }
}`,
    optimalSolution: `class Trie {
    class TrieNode {
        TrieNode[] children;
        boolean isEndOfWord;
        
        public TrieNode() {
            children = new TrieNode[26];
            isEndOfWord = false;
        }
    }
    
    private TrieNode root;
    
    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode current = root;
        
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (current.children[index] == null) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index];
        }
        
        current.isEndOfWord = true;
    }
    
    public boolean search(String word) {
        TrieNode current = root;
        
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (current.children[index] == null) {
                return false;
            }
            current = current.children[index];
        }
        
        return current.isEndOfWord;
    }
    
    public boolean startsWith(String prefix) {
        TrieNode current = root;
        
        for (char c : prefix.toCharArray()) {
            int index = c - 'a';
            if (current.children[index] == null) {
                return false;
            }
            current = current.children[index];
        }
        
        return true;
    }
}`,
    bruteForceComplexity: {
      time: "O(1) for insert, O(1) for search, O(n*m) for startsWith",
      space: "O(n*m)",
      reasoning: "HashSet operations are O(1), but startsWith requires checking all words."
    },
    optimalComplexity: {
      time: "O(m) for all operations",
      space: "O(ALPHABET_SIZE * N * M)",
      reasoning: "All operations depend on word length m, space depends on number of nodes in trie."
    },
    leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/"
  },
  {
    id: "add-and-search-word-data-structure-design",
    title: "Design Add and Search Words Data Structure",
    description: "Design a data structure that supports adding new words and finding if a string matches any previously added string.\n\nImplement the WordDictionary class:\n\n- WordDictionary() Initializes the object.\n- void addWord(word) Adds word to the data structure, it can be matched later.\n- bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.",
    difficulty: "Medium",
    tags: ["String", "Depth-First Search", "Design", "Trie"],
    examples: [
      {
        input: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]',
        output: '[null,null,null,null,false,true,true,true]',
        explanation: 'WordDictionary wordDictionary = new WordDictionary();\nwordDictionary.addWord("bad");\nwordDictionary.addWord("dad");\nwordDictionary.addWord("mad");\nwordDictionary.search("pad"); // return False\nwordDictionary.search("bad"); // return True\nwordDictionary.search(".ad"); // return True\nwordDictionary.search("b.."); // return True'
      }
    ],
    bruteForceSolution: `class WordDictionary {
    private List<String> words;
    
    public WordDictionary() {
        words = new ArrayList<>();
    }
    
    public void addWord(String word) {
        words.add(word);
    }
    
    public boolean search(String word) {
        for (String w : words) {
            if (matches(w, word)) {
                return true;
            }
        }
        return false;
    }
    
    private boolean matches(String word, String pattern) {
        if (word.length() != pattern.length()) {
            return false;
        }
        
        for (int i = 0; i < word.length(); i++) {
            if (pattern.charAt(i) != '.' && word.charAt(i) != pattern.charAt(i)) {
                return false;
            }
        }
        
        return true;
    }
}`,
    optimalSolution: `class WordDictionary {
    class TrieNode {
        TrieNode[] children;
        boolean isEndOfWord;
        
        public TrieNode() {
            children = new TrieNode[26];
            isEndOfWord = false;
        }
    }
    
    private TrieNode root;
    
    public WordDictionary() {
        root = new TrieNode();
    }
    
    public void addWord(String word) {
        TrieNode current = root;
        
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (current.children[index] == null) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index];
        }
        
        current.isEndOfWord = true;
    }
    
    public boolean search(String word) {
        return searchHelper(word, 0, root);
    }
    
    private boolean searchHelper(String word, int index, TrieNode node) {
        if (index == word.length()) {
            return node.isEndOfWord;
        }
        
        char c = word.charAt(index);
        
        if (c == '.') {
            // Try all possible children
            for (TrieNode child : node.children) {
                if (child != null && searchHelper(word, index + 1, child)) {
                    return true;
                }
            }
            return false;
        } else {
            int charIndex = c - 'a';
            if (node.children[charIndex] == null) {
                return false;
            }
            return searchHelper(word, index + 1, node.children[charIndex]);
        }
    }
}`,
    bruteForceComplexity: {
      time: "O(1) for addWord, O(n*m) for search",
      space: "O(n*m)",
      reasoning: "Search requires checking all stored words against pattern."
    },
    optimalComplexity: {
      time: "O(m) for addWord, O(26^k * m) for search where k is number of dots",
      space: "O(ALPHABET_SIZE * N * M)",
      reasoning: "Trie structure with DFS for wildcard matching."
    },
    leetcodeUrl: "https://leetcode.com/problems/design-add-and-search-words-data-structure/"
  },
  {
    id: "word-search-ii",
    title: "Word Search II",
    description: "Given an m x n board of characters and a list of strings words, return all words on the board.\n\nEach word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.",
    difficulty: "Hard",
    tags: ["Array", "String", "Backtracking", "Trie", "Matrix"],
    examples: [
      {
        input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
        output: '["eat","oath"]'
      },
      {
        input: 'board = [["a","b"],["c","d"]], words = ["abcb"]',
        output: '[]'
      }
    ],
    bruteForceSolution: `class Solution {
    public List<String> findWords(char[][] board, String[] words) {
        List<String> result = new ArrayList<>();
        
        for (String word : words) {
            if (wordExists(board, word)) {
                result.add(word);
            }
        }
        
        return result;
    }
    
    private boolean wordExists(char[][] board, String word) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                if (dfs(board, word, 0, i, j, new boolean[board.length][board[0].length])) {
                    return true;
                }
            }
        }
        return false;
    }
    
    private boolean dfs(char[][] board, String word, int index, int row, int col, boolean[][] visited) {
        if (index == word.length()) return true;
        
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length ||
            visited[row][col] || board[row][col] != word.charAt(index)) {
            return false;
        }
        
        visited[row][col] = true;
        
        boolean found = dfs(board, word, index + 1, row + 1, col, visited) ||
                       dfs(board, word, index + 1, row - 1, col, visited) ||
                       dfs(board, word, index + 1, row, col + 1, visited) ||
                       dfs(board, word, index + 1, row, col - 1, visited);
        
        visited[row][col] = false;
        return found;
    }
}`,
    optimalSolution: `class Solution {
    class TrieNode {
        TrieNode[] children;
        String word;
        
        public TrieNode() {
            children = new TrieNode[26];
            word = null;
        }
    }
    
    public List<String> findWords(char[][] board, String[] words) {
        // Build Trie
        TrieNode root = new TrieNode();
        for (String word : words) {
            TrieNode current = root;
            for (char c : word.toCharArray()) {
                int index = c - 'a';
                if (current.children[index] == null) {
                    current.children[index] = new TrieNode();
                }
                current = current.children[index];
            }
            current.word = word;
        }
        
        List<String> result = new ArrayList<>();
        
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                dfs(board, i, j, root, result);
            }
        }
        
        return result;
    }
    
    private void dfs(char[][] board, int row, int col, TrieNode node, List<String> result) {
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
            return;
        }
        
        char c = board[row][col];
        if (c == '#' || node.children[c - 'a'] == null) {
            return;
        }
        
        node = node.children[c - 'a'];
        
        if (node.word != null) {
            result.add(node.word);
            node.word = null; // Avoid duplicates
        }
        
        board[row][col] = '#'; // Mark as visited
        
        dfs(board, row + 1, col, node, result);
        dfs(board, row - 1, col, node, result);
        dfs(board, row, col + 1, node, result);
        dfs(board, row, col - 1, node, result);
        
        board[row][col] = c; // Backtrack
    }
}`,
    bruteForceComplexity: {
      time: "O(N * 4^(L) * M)",
      space: "O(L)",
      reasoning: "For each word, perform DFS from every cell. N=words, L=max word length, M=cells."
    },
    optimalComplexity: {
      time: "O(M * 4^L)",
      space: "O(N * L)",
      reasoning: "Build trie once, then single DFS traversal. Trie eliminates redundant searches."
    },
    leetcodeUrl: "https://leetcode.com/problems/word-search-ii/"
  }
];
