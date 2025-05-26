import { Question } from '../types';

export const triesQuestions: Question[] = [
  {
    id: 58,
    title: "Implement Trie (Prefix Tree)",
    description: "A trie (pronounced as \"try\") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker. Implement the Trie class.",
    examples: [
      {
        input: `["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]`,
        output: "[null, null, true, false, true, null, true]",
        explanation: "Trie trie = new Trie();\ntrie.insert(\"apple\");\ntrie.search(\"apple\");   // returns true\ntrie.search(\"app\");     // returns false\ntrie.startsWith(\"app\"); // returns true\ntrie.insert(\"app\");\ntrie.search(\"app\");     // returns true"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class Trie {
    private Set<String> words;
    private Set<String> prefixes;
    
    public Trie() {
        words = new HashSet<>();
        prefixes = new HashSet<>();
    }
    
    public void insert(String word) {
        words.add(word);
        for (int i = 1; i <= word.length(); i++) {
            prefixes.add(word.substring(0, i));
        }
    }
    
    public boolean search(String word) {
        return words.contains(word);
    }
    
    public boolean startsWith(String prefix) {
        return prefixes.contains(prefix);
    }
}`,
        timeComplexity: "O(n) for insert, O(1) for search and startsWith",
        spaceComplexity: "O(m*n) where m is number of words and n is average length",
        explanation: "We use two HashSets to store complete words and all possible prefixes."
      },
      {
        approach: "Optimal",
        code: `class Trie {
    private class TrieNode {
        private TrieNode[] children;
        private boolean isEndOfWord;
        
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
        TrieNode node = searchNode(word);
        return node != null && node.isEndOfWord;
    }
    
    public boolean startsWith(String prefix) {
        return searchNode(prefix) != null;
    }
    
    private TrieNode searchNode(String str) {
        TrieNode current = root;
        for (char c : str.toCharArray()) {
            int index = c - 'a';
            if (current.children[index] == null) {
                return null;
            }
            current = current.children[index];
        }
        return current;
    }
}`,
        timeComplexity: "O(m) for all operations where m is length of word",
        spaceComplexity: "O(ALPHABET_SIZE * m * n) where n is number of words",
        explanation: "We implement a proper trie data structure using nodes with character links. Each node also has a flag indicating if it represents the end of a word."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/",
    difficulty: "Medium",
    category: "tries"
  },
  {
    id: 59,
    title: "Add and Search Word",
    description: "Design a data structure that supports adding new words and finding if a string matches any previously added string. Implement the WordDictionary class. The word can contain dots '.' where dots can be matched with any letter.",
    examples: [
      {
        input: `["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]`,
        output: "[null,null,null,null,false,true,true,true]",
        explanation: "WordDictionary wordDictionary = new WordDictionary();\nwordDictionary.addWord(\"bad\");\nwordDictionary.addWord(\"dad\");\nwordDictionary.addWord(\"mad\");\nwordDictionary.search(\"pad\"); // return False\nwordDictionary.search(\"bad\"); // return True\nwordDictionary.search(\".ad\"); // return True\nwordDictionary.search(\"b..\"); // return True"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `class WordDictionary {
    private Set<String> words;
    
    public WordDictionary() {
        words = new HashSet<>();
    }
    
    public void addWord(String word) {
        words.add(word);
    }
    
    public boolean search(String word) {
        if (!word.contains(".")) {
            return words.contains(word);
        }
        
        for (String w : words) {
            if (w.length() != word.length()) continue;
            
            boolean matches = true;
            for (int i = 0; i < word.length(); i++) {
                if (word.charAt(i) != '.' && word.charAt(i) != w.charAt(i)) {
                    matches = false;
                    break;
                }
            }
            if (matches) return true;
        }
        
        return false;
    }
}`,
        timeComplexity: "O(1) for addWord, O(n*m) for search where n is number of words",
        spaceComplexity: "O(n*m) where n is number of words and m is average length",
        explanation: "We store words in a HashSet and check each word against the pattern when searching."
      },
      {
        approach: "Optimal",
        code: `class WordDictionary {
    private class TrieNode {
        private TrieNode[] children;
        private boolean isEndOfWord;
        
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
            for (TrieNode child : node.children) {
                if (child != null && searchHelper(word, index + 1, child)) {
                    return true;
                }
            }
            return false;
        } else {
            int childIndex = c - 'a';
            TrieNode child = node.children[childIndex];
            if (child == null) {
                return false;
            }
            return searchHelper(word, index + 1, child);
        }
    }
}`,
        timeComplexity: "O(m) for addWord, O(26^n) worst case for search with all dots",
        spaceComplexity: "O(ALPHABET_SIZE * m * n)",
        explanation: "We use a trie with recursive search that handles dots by trying all possible characters at that position."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    difficulty: "Medium",
    category: "tries"
  },
  {
    id: 60,
    title: "Word Search II",
    description: "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.",
    examples: [
      {
        input: `board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]`,
        output: `["eat","oath"]`
      },
      {
        input: `board = [["a","b"],["c","d"]], words = ["abcb"]`,
        output: "[]"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public List<String> findWords(char[][] board, String[] words) {
    List<String> result = new ArrayList<>();
    for (String word : words) {
        if (exist(board, word)) {
            result.add(word);
        }
    }
    return result;
}

private boolean exist(char[][] board, String word) {
    int m = board.length;
    int n = board[0].length;
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (dfs(board, i, j, word, 0)) {
                return true;
            }
        }
    }
    return false;
}

private boolean dfs(char[][] board, int i, int j, String word, int index) {
    if (index == word.length()) return true;
    
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length ||
        board[i][j] != word.charAt(index)) {
        return false;
    }
    
    char temp = board[i][j];
    board[i][j] = '#';
    
    boolean found = dfs(board, i+1, j, word, index+1) ||
                   dfs(board, i-1, j, word, index+1) ||
                   dfs(board, i, j+1, word, index+1) ||
                   dfs(board, i, j-1, word, index+1);
    
    board[i][j] = temp;
    return found;
}`,
        timeComplexity: "O(N * 4^L) where N is number of cells and L is max word length",
        spaceComplexity: "O(L)",
        explanation: "For each word, we try to find it on the board using DFS from each starting position."
      },
      {
        approach: "Optimal",
        code: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    String word = null;
}

public List<String> findWords(char[][] board, String[] words) {
    List<String> result = new ArrayList<>();
    TrieNode root = buildTrie(words);
    
    for (int i = 0; i < board.length; i++) {
        for (int j = 0; j < board[0].length; j++) {
            dfs(board, i, j, root, result);
        }
    }
    
    return result;
}

private TrieNode buildTrie(String[] words) {
    TrieNode root = new TrieNode();
    for (String word : words) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (node.children[index] == null) {
                node.children[index] = new TrieNode();
            }
            node = node.children[index];
        }
        node.word = word;
    }
    return root;
}

private void dfs(char[][] board, int i, int j, TrieNode node, List<String> result) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length ||
        board[i][j] == '#' || node.children[board[i][j] - 'a'] == null) {
        return;
    }
    
    char c = board[i][j];
    node = node.children[c - 'a'];
    
    if (node.word != null) {
        result.add(node.word);
        node.word = null;  // avoid duplicates
    }
    
    board[i][j] = '#';
    dfs(board, i+1, j, node, result);
    dfs(board, i-1, j, node, result);
    dfs(board, i, j+1, node, result);
    dfs(board, i, j-1, node, result);
    board[i][j] = c;
}`,
        timeComplexity: "O(M * N * 4^L) where M,N are board dimensions",
        spaceComplexity: "O(number of total chars in words)",
        explanation: "We build a trie from the words, then use DFS with the trie to find words on the board. This avoids checking each word separately."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/word-search-ii/",
    difficulty: "Hard",
    category: "tries"
  }
];