import { Question } from "./types";

export const treeQuestions: Question[] = [
  {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    description: "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3"
      },
      {
        input: "root = [1,null,2]",
        output: "2"
      }
    ],
    bruteForceSolution: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        
        // Level-order traversal to count levels
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int depth = 0;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            depth++;
            
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
        }
        
        return depth;
    }
}`,
    optimalSolution: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        
        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);
        
        return Math.max(leftDepth, rightDepth) + 1;
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(n)",
      reasoning: "BFS traversal using queue, storing all nodes at each level."
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(h)",
      reasoning: "DFS recursion with call stack depth equal to tree height."
    },
    leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
  },
  {
    id: "same-tree",
    title: "Same Tree",
    description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    examples: [
      {
        input: "p = [1,2,3], q = [1,2,3]",
        output: "true"
      },
      {
        input: "p = [1,2], q = [1,null,2]",
        output: "false"
      }
    ],
    bruteForceSolution: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        // Serialize both trees and compare strings
        String serialP = serialize(p);
        String serialQ = serialize(q);
        
        return serialP.equals(serialQ);
    }
    
    private String serialize(TreeNode root) {
        if (root == null) return "null,";
        
        StringBuilder sb = new StringBuilder();
        sb.append(root.val).append(",");
        sb.append(serialize(root.left));
        sb.append(serialize(root.right));
        
        return sb.toString();
    }
}`,
    optimalSolution: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        
        if (p.val != q.val) return false;
        
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(n)",
      reasoning: "Serialize both trees to strings, then compare strings."
    },
    optimalComplexity: {
      time: "O(min(m, n))",
      space: "O(min(m, n))",
      reasoning: "Recursive comparison stops early on first difference, call stack depth limited by smaller tree."
    },
    leetcodeUrl: "https://leetcode.com/problems/same-tree/"
  },
  {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    description: "Given the root of a binary tree, invert the tree, and return its root.",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    examples: [
      {
        input: "root = [4,2,7,1,3,6,9]",
        output: "[4,7,2,9,6,3,1]"
      },
      {
        input: "root = [2,1,3]",
        output: "[2,3,1]"
      }
    ],
    bruteForceSolution: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        
        // Level-order traversal and swap children at each node
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            
            // Swap children
            TreeNode temp = node.left;
            node.left = node.right;
            node.right = temp;
            
            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
        
        return root;
    }
}`,
    optimalSolution: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        
        // Swap children
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        
        // Recursively invert subtrees
        invertTree(root.left);
        invertTree(root.right);
        
        return root;
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(n)",
      reasoning: "BFS traversal using queue to visit and swap all nodes."
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(h)",
      reasoning: "DFS recursion with call stack depth equal to tree height."
    },
    leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/"
  },
  {
    id: "diameter-of-binary-tree",
    title: "Diameter of Binary Tree",
    description: "Given the root of a binary tree, return the length of the diameter of the tree.\n\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.\n\nThe length of a path between two nodes is represented by the number of edges between them.",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Binary Tree"],
    examples: [
      {
        input: "root = [1,2,3,4,5]",
        output: "3",
        explanation: "The diameter is the path [4,2,1,3] or [5,2,1,3]."
      },
      {
        input: "root = [1,2]",
        output: "1"
      }
    ],
    bruteForceSolution: `class Solution {
    public int diameterOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        
        // Calculate diameter for each node as root
        return Math.max(
            diameterThroughRoot(root),
            Math.max(diameterOfBinaryTree(root.left), diameterOfBinaryTree(root.right))
        );
    }
    
    private int diameterThroughRoot(TreeNode root) {
        if (root == null) return 0;
        
        int leftHeight = maxDepth(root.left);
        int rightHeight = maxDepth(root.right);
        
        return leftHeight + rightHeight;
    }
    
    private int maxDepth(TreeNode root) {
        if (root == null) return 0;
        
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}`,
    optimalSolution: `class Solution {
    private int maxDiameter = 0;
    
    public int diameterOfBinaryTree(TreeNode root) {
        dfs(root);
        return maxDiameter;
    }
    
    private int dfs(TreeNode root) {
        if (root == null) return 0;
        
        int leftHeight = dfs(root.left);
        int rightHeight = dfs(root.right);
        
        // Update global maximum diameter
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
        
        // Return height of current subtree
        return Math.max(leftHeight, rightHeight) + 1;
    }
}`,
    bruteForceComplexity: {
      time: "O(n²)",
      space: "O(h)",
      reasoning: "For each node, calculate diameter through that node requiring height calculation."
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(h)",
      reasoning: "Single DFS pass calculating height and updating diameter simultaneously."
    },
    leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/"
  },
  {
    id: "subtree-of-another-tree",
    title: "Subtree of Another Tree",
    description: "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.\n\nA subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "String Matching", "Binary Tree", "Hash Function"],
    examples: [
      {
        input: "root = [3,4,5,1,2], subRoot = [4,1,2]",
        output: "true"
      },
      {
        input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]",
        output: "false"
      }
    ],
    bruteForceSolution: `class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return false;
        
        // Check if current node is root of matching subtree
        if (isSameTree(root, subRoot)) {
            return true;
        }
        
        // Check left and right subtrees
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }
    
    private boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        
        if (p.val != q.val) return false;
        
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,
    optimalSolution: `class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        String rootStr = serialize(root);
        String subRootStr = serialize(subRoot);
        
        return rootStr.contains(subRootStr);
    }
    
    private String serialize(TreeNode root) {
        if (root == null) return "null";
        
        return "#" + root.val + " " + serialize(root.left) + " " + serialize(root.right);
    }
}`,
    bruteForceComplexity: {
      time: "O(m * n)",
      space: "O(h1 + h2)",
      reasoning: "For each node in main tree, check if subtree matches using isSameTree."
    },
    optimalComplexity: {
      time: "O(m + n)",
      space: "O(m + n)",
      reasoning: "Serialize both trees and use string matching to find subtree."
    },
    leetcodeUrl: "https://leetcode.com/problems/subtree-of-another-tree/"
  },
  {
    id: "lowest-common-ancestor-of-bst",
    title: "Lowest Common Ancestor of a Binary Search Tree",
    description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nAccording to the definition of LCA on Wikipedia: \"The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).\"",
    difficulty: "Medium",
    tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"],
    examples: [
      {
        input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
        output: "6",
        explanation: "The LCA of nodes 2 and 8 is 6."
      },
      {
        input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
        output: "2",
        explanation: "The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition."
      }
    ],
    bruteForceSolution: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Find paths to both nodes
        List<TreeNode> pathToP = new ArrayList<>();
        List<TreeNode> pathToQ = new ArrayList<>();
        
        findPath(root, p, pathToP);
        findPath(root, q, pathToQ);
        
        // Find last common node in paths
        TreeNode lca = null;
        int minLength = Math.min(pathToP.size(), pathToQ.size());
        
        for (int i = 0; i < minLength; i++) {
            if (pathToP.get(i) == pathToQ.get(i)) {
                lca = pathToP.get(i);
            } else {
                break;
            }
        }
        
        return lca;
    }
    
    private boolean findPath(TreeNode root, TreeNode target, List<TreeNode> path) {
        if (root == null) return false;
        
        path.add(root);
        
        if (root == target) return true;
        
        if (findPath(root.left, target, path) || findPath(root.right, target, path)) {
            return true;
        }
        
        path.remove(path.size() - 1);
        return false;
    }
}`,
    optimalSolution: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode current = root;
        
        while (current != null) {
            if (p.val > current.val && q.val > current.val) {
                // Both nodes are in right subtree
                current = current.right;
            } else if (p.val < current.val && q.val < current.val) {
                // Both nodes are in left subtree
                current = current.left;
            } else {
                // Split point found - current node is LCA
                return current;
            }
        }
        
        return null;
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(h)",
      reasoning: "Find paths to both nodes, then compare paths to find LCA."
    },
    optimalComplexity: {
      time: "O(h)",
      space: "O(1)",
      reasoning: "Use BST property to navigate directly to LCA without storing paths."
    },
    leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
  },
  {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    difficulty: "Medium",
    tags: ["Tree", "Breadth-First Search", "Binary Tree"],
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]"
      },
      {
        input: "root = [1]",
        output: "[[1]]"
      }
    ],
    bruteForceSolution: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        // Use DFS with level tracking
        dfs(root, 0, result);
        return result;
    }
    
    private void dfs(TreeNode node, int level, List<List<Integer>> result) {
        if (node == null) return;
        
        // Ensure we have a list for this level
        if (level >= result.size()) {
            result.add(new ArrayList<>());
        }
        
        result.get(level).add(node.val);
        
        dfs(node.left, level + 1, result);
        dfs(node.right, level + 1, result);
    }
}`,
    optimalSolution: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
            
            result.add(currentLevel);
        }
        
        return result;
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(h)",
      reasoning: "DFS with level tracking, call stack depth equals tree height."
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(w)",
      reasoning: "BFS using queue, space proportional to maximum width of tree."
    },
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
  },
  {
    id: "serialize-and-deserialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
    description: "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
    difficulty: "Hard",
    tags: ["String", "Tree", "Depth-First Search", "Breadth-First Search", "Design", "Binary Tree"],
    examples: [
      {
        input: "root = [1,2,3,null,null,4,5]",
        output: "[1,2,3,null,null,4,5]"
      },
      {
        input: "root = []",
        output: "[]"
      }
    ],
    bruteForceSolution: `public class Codec {
    
    public String serialize(TreeNode root) {
        List<String> result = new ArrayList<>();
        serializeHelper(root, result);
        return String.join(",", result);
    }
    
    private void serializeHelper(TreeNode node, List<String> result) {
        if (node == null) {
            result.add("null");
            return;
        }
        
        result.add(String.valueOf(node.val));
        serializeHelper(node.left, result);
        serializeHelper(node.right, result);
    }
    
    public TreeNode deserialize(String data) {
        String[] nodes = data.split(",");
        List<String> nodeList = new ArrayList<>(Arrays.asList(nodes));
        return deserializeHelper(nodeList);
    }
    
    private TreeNode deserializeHelper(List<String> nodeList) {
        if (nodeList.isEmpty()) return null;
        
        String val = nodeList.remove(0);
        if (val.equals("null")) return null;
        
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = deserializeHelper(nodeList);
        node.right = deserializeHelper(nodeList);
        
        return node;
    }
}`,
    optimalSolution: `public class Codec {
    
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        serializeHelper(root, sb);
        return sb.toString();
    }
    
    private void serializeHelper(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append("null,");
            return;
        }
        
        sb.append(node.val).append(",");
        serializeHelper(node.left, sb);
        serializeHelper(node.right, sb);
    }
    
    public TreeNode deserialize(String data) {
        String[] nodes = data.split(",");
        int[] index = {0}; // Use array to maintain reference
        return deserializeHelper(nodes, index);
    }
    
    private TreeNode deserializeHelper(String[] nodes, int[] index) {
        if (index[0] >= nodes.length || nodes[index[0]].equals("null")) {
            index[0]++;
            return null;
        }
        
        TreeNode node = new TreeNode(Integer.parseInt(nodes[index[0]]));
        index[0]++;
        
        node.left = deserializeHelper(nodes, index);
        node.right = deserializeHelper(nodes, index);
        
        return node;
    }
}`,
    bruteForceComplexity: {
      time: "O(n) for both serialize and deserialize",
      space: "O(n)",
      reasoning: "Use list operations which may involve array copying and extra space."
    },
    optimalComplexity: {
      time: "O(n) for both serialize and deserialize",
      space: "O(n)",
      reasoning: "Preorder traversal with index tracking, minimal extra space usage."
    },
    leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
  },
  {
    id: "construct-binary-tree-from-preorder-and-inorder-traversal",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    description: "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
    difficulty: "Medium",
    tags: ["Array", "Hash Table", "Divide and Conquer", "Tree", "Binary Tree"],
    examples: [
      {
        input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
        output: "[3,9,20,null,null,15,7]"
      },
      {
        input: "preorder = [-1], inorder = [-1]",
        output: "[-1]"
      }
    ],
    bruteForceSolution: `class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder.length == 0) return null;
        
        return buildHelper(preorder, inorder, 0, preorder.length - 1, 0, inorder.length - 1);
    }
    
    private TreeNode buildHelper(int[] preorder, int[] inorder, 
                                int preStart, int preEnd, int inStart, int inEnd) {
        if (preStart > preEnd || inStart > inEnd) return null;
        
        int rootVal = preorder[preStart];
        TreeNode root = new TreeNode(rootVal);
        
        // Find root position in inorder array
        int rootIndex = -1;
        for (int i = inStart; i <= inEnd; i++) {
            if (inorder[i] == rootVal) {
                rootIndex = i;
                break;
            }
        }
        
        int leftSize = rootIndex - inStart;
        
        root.left = buildHelper(preorder, inorder, 
                               preStart + 1, preStart + leftSize, 
                               inStart, rootIndex - 1);
        root.right = buildHelper(preorder, inorder, 
                                preStart + leftSize + 1, preEnd, 
                                rootIndex + 1, inEnd);
        
        return root;
    }
}`,
    optimalSolution: `class Solution {
    private Map<Integer, Integer> inorderMap;
    private int preorderIndex;
    
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        // Build hashmap for O(1) lookup of root position in inorder
        inorderMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inorderMap.put(inorder[i], i);
        }
        
        preorderIndex = 0;
        return buildHelper(preorder, 0, inorder.length - 1);
    }
    
    private TreeNode buildHelper(int[] preorder, int inStart, int inEnd) {
        if (inStart > inEnd) return null;
        
        int rootVal = preorder[preorderIndex++];
        TreeNode root = new TreeNode(rootVal);
        
        int rootIndex = inorderMap.get(rootVal);
        
        // Build left subtree first (preorder: root -> left -> right)
        root.left = buildHelper(preorder, inStart, rootIndex - 1);
        root.right = buildHelper(preorder, rootIndex + 1, inEnd);
        
        return root;
    }
}`,
    bruteForceComplexity: {
      time: "O(n²)",
      space: "O(n)",
      reasoning: "For each node, linear search in inorder array to find root position."
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(n)",
      reasoning: "HashMap enables O(1) root lookup, each node processed exactly once."
    },
    leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
  },
  {
    id: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.",
    difficulty: "Medium",
    tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"],
    examples: [
      {
        input: "root = [2,1,3]",
        output: "true"
      },
      {
        input: "root = [5,1,4,null,null,3,6]",
        output: "false",
        explanation: "The root node's value is 5 but its right child's value is 4."
      }
    ],
    bruteForceSolution: `class Solution {
    public boolean isValidBST(TreeNode root) {
        // Perform inorder traversal and check if result is sorted
        List<Integer> inorder = new ArrayList<>();
        inorderTraversal(root, inorder);
        
        for (int i = 1; i < inorder.size(); i++) {
            if (inorder.get(i) <= inorder.get(i - 1)) {
                return false;
            }
        }
        
        return true;
    }
    
    private void inorderTraversal(TreeNode root, List<Integer> result) {
        if (root == null) return;
        
        inorderTraversal(root.left, result);
        result.add(root.val);
        inorderTraversal(root.right, result);
    }
}`,
    optimalSolution: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    
    private boolean validate(TreeNode node, long minVal, long maxVal) {
        if (node == null) return true;
        
        if (node.val <= minVal || node.val >= maxVal) {
            return false;
        }
        
        return validate(node.left, minVal, node.val) && 
               validate(node.right, node.val, maxVal);
    }
}`,
    bruteForceComplexity: {
      time: "O(n)",
      space: "O(n)",
      reasoning: "Store entire inorder traversal in array, then check if sorted."
    },
    optimalComplexity: {
      time: "O(n)",
      space: "O(h)",
      reasoning: "Recursive validation with min/max bounds, call stack depth equals tree height."
    },
    leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/"
  }
];
