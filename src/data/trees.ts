import { Question } from '../types';

export const treesQuestions: Question[] = [
  {
    id: 48,
    title: "Maximum Depth of Binary Tree",
    description: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3",
        explanation: "The maximum depth is 3, which is the path 3->20->7 or 3->20->15."
      },
      {
        input: "root = [1,null,2]",
        output: "2"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    
    List<TreeNode> queue = new ArrayList<>();
    queue.add(root);
    int depth = 0;
    
    while (!queue.isEmpty()) {
        depth++;
        List<TreeNode> temp = new ArrayList<>();
        for (TreeNode node : queue) {
            if (node.left != null) temp.add(node.left);
            if (node.right != null) temp.add(node.right);
        }
        queue = temp;
    }
    
    return depth;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We use level-order traversal to count the number of levels in the tree."
      },
      {
        approach: "Optimal",
        code: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h) where h is height of tree",
        explanation: "We use recursion to find the maximum depth of left and right subtrees, then take the maximum and add 1 for the current node."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    difficulty: "Easy",
    category: "trees"
  },
  {
    id: 49,
    title: "Same Tree",
    description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
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
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean isSameTree(TreeNode p, TreeNode q) {
    List<Integer> pValues = new ArrayList<>();
    List<Integer> qValues = new ArrayList<>();
    
    inorder(p, pValues);
    inorder(q, qValues);
    
    return pValues.equals(qValues);
}

private void inorder(TreeNode root, List<Integer> values) {
    if (root == null) {
        values.add(null);
        return;
    }
    values.add(root.val);
    inorder(root.left, values);
    inorder(root.right, values);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We convert both trees to lists using inorder traversal and compare the lists."
      },
      {
        approach: "Optimal",
        code: `public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    
    return p.val == q.val && 
           isSameTree(p.left, q.left) && 
           isSameTree(p.right, q.right);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h) where h is height of tree",
        explanation: "We recursively compare each node in both trees. Trees are same if current nodes are same and their left and right subtrees are same."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/same-tree/",
    difficulty: "Easy",
    category: "trees"
  },
  {
    id: 50,
    title: "Invert Binary Tree",
    description: "Given the root of a binary tree, invert the tree, and return its root.",
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
    solutions: [
      {
        approach: "Brute Force",
        code: `public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        TreeNode temp = node.left;
        node.left = node.right;
        node.right = temp;
        
        if (node.left != null) queue.add(node.left);
        if (node.right != null) queue.add(node.right);
    }
    
    return root;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We use level-order traversal and swap left and right children for each node."
      },
      {
        approach: "Optimal",
        code: `public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    
    TreeNode left = invertTree(root.left);
    TreeNode right = invertTree(root.right);
    
    root.left = right;
    root.right = left;
    
    return root;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h) where h is height of tree",
        explanation: "We use recursion to invert left and right subtrees, then swap them for the current node."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/invert-binary-tree/",
    difficulty: "Easy",
    category: "trees"
  },
  {
    id: 51,
    title: "Diameter of Binary Tree",
    description: "Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.",
    examples: [
      {
        input: "root = [1,2,3,4,5]",
        output: "3",
        explanation: "The length of the path [4,2,1,3] or [5,2,1,3]."
      },
      {
        input: "root = [1,2]",
        output: "1"
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public int diameterOfBinaryTree(TreeNode root) {
    if (root == null) return 0;
    
    int leftHeight = height(root.left);
    int rightHeight = height(root.right);
    
    int leftDiameter = diameterOfBinaryTree(root.left);
    int rightDiameter = diameterOfBinaryTree(root.right);
    
    return Math.max(leftHeight + rightHeight, 
                   Math.max(leftDiameter, rightDiameter));
}

private int height(TreeNode node) {
    if (node == null) return 0;
    return 1 + Math.max(height(node.left), height(node.right));
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(h)",
        explanation: "For each node, we calculate its height and diameter separately."
      },
      {
        approach: "Optimal",
        code: `private int diameter = 0;

public int diameterOfBinaryTree(TreeNode root) {
    height(root);
    return diameter;
}

private int height(TreeNode node) {
    if (node == null) return 0;
    
    int leftHeight = height(node.left);
    int rightHeight = height(node.right);
    
    diameter = Math.max(diameter, leftHeight + rightHeight);
    
    return 1 + Math.max(leftHeight, rightHeight);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
        explanation: "We calculate height and update diameter in a single traversal. For each node, diameter is the sum of heights of left and right subtrees."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/",
    difficulty: "Easy",
    category: "trees"
  },
  {
    id: 52,
    title: "Subtree of Another Tree",
    description: "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.",
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
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean isSubtree(TreeNode root, TreeNode subRoot) {
    if (root == null) return false;
    if (isSameTree(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

private boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    return p.val == q.val && 
           isSameTree(p.left, q.left) && 
           isSameTree(p.right, q.right);
}`,
        timeComplexity: "O(m*n) where m and n are sizes of trees",
        spaceComplexity: "O(h)",
        explanation: "For each node in the main tree, we check if the subtree rooted at that node is identical to the given subtree."
      },
      {
        approach: "Optimal",
        code: `public boolean isSubtree(TreeNode root, TreeNode subRoot) {
    StringBuilder rootStr = new StringBuilder();
    StringBuilder subRootStr = new StringBuilder();
    
    serialize(root, rootStr);
    serialize(subRoot, subRootStr);
    
    return rootStr.toString().contains(subRootStr.toString());
}

private void serialize(TreeNode root, StringBuilder sb) {
    if (root == null) {
        sb.append(",#");
        return;
    }
    sb.append("," + root.val);
    serialize(root.left, sb);
    serialize(root.right, sb);
}`,
        timeComplexity: "O(m+n)",
        spaceComplexity: "O(m+n)",
        explanation: "We serialize both trees into strings and check if one string contains the other. Special markers are used to handle null nodes."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/subtree-of-another-tree/",
    difficulty: "Easy",
    category: "trees"
  },
  {
    id: 53,
    title: "Lowest Common Ancestor of BST",
    description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
    examples: [
      {
        input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
        output: "6",
        explanation: "The LCA of nodes 2 and 8 is 6."
      },
      {
        input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
        output: "2",
        explanation: "The LCA of nodes 2 and 4 is 2."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    List<TreeNode> path1 = new ArrayList<>();
    List<TreeNode> path2 = new ArrayList<>();
    
    findPath(root, p, path1);
    findPath(root, q, path2);
    
    TreeNode lca = null;
    int i = 0;
    while (i < path1.size() && i < path2.size()) {
        if (path1.get(i) == path2.get(i)) {
            lca = path1.get(i);
        }
        i++;
    }
    
    return lca;
}

private boolean findPath(TreeNode root, TreeNode node, List<TreeNode> path) {
    if (root == null) return false;
    
    path.add(root);
    if (root == node) return true;
    
    if (findPath(root.left, node, path) || findPath(root.right, node, path)) {
        return true;
    }
    
    path.remove(path.size() - 1);
    return false;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
        explanation: "We find paths from root to both nodes and then find the last common node in these paths."
      },
      {
        approach: "Optimal",
        code: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null) return null;
    
    // If both p and q are greater than root, LCA must be in right subtree
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    
    // If both p and q are smaller than root, LCA must be in left subtree
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    
    // If one node is smaller and other is greater, root is LCA
    return root;
}`,
        timeComplexity: "O(h) where h is height of tree",
        spaceComplexity: "O(h)",
        explanation: "We use BST property: if both nodes are greater than root, LCA is in right subtree; if both are smaller, LCA is in left subtree; otherwise current node is LCA."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    difficulty: "Medium",
    category: "trees"
  },
  {
    id: 54,
    title: "Binary Tree Level Order Traversal",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
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
    solutions: [
      {
        approach: "Brute Force",
        code: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    
    Map<Integer, List<Integer>> levelMap = new HashMap<>();
    dfs(root, 0, levelMap);
    
    int maxLevel = 0;
    for (int level : levelMap.keySet()) {
        maxLevel = Math.max(maxLevel, level);
    }
    
    for (int i = 0; i <= maxLevel; i++) {
        result.add(levelMap.get(i));
    }
    
    return result;
}

private void dfs(TreeNode node, int level, Map<Integer, List<Integer>> levelMap) {
    if (node == null) return;
    
    levelMap.putIfAbsent(level, new ArrayList<>());
    levelMap.get(level).add(node.val);
    
    dfs(node.left, level + 1, levelMap);
    dfs(node.right, level + 1, levelMap);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We use DFS with a HashMap to store nodes at each level, then construct the result list."
      },
      {
        approach: "Optimal",
        code: `public List<List<Integer>> levelOrder(TreeNode root) {
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
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        
        result.add(currentLevel);
    }
    
    return result;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(w) where w is maximum width of tree",
        explanation: "We use BFS with a queue. For each level, we process all nodes at that level before moving to the next level."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    difficulty: "Medium",
    category: "trees"
  },
  {
    id: 55,
    title: "Serialize and Deserialize Binary Tree",
    description: "Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
    examples: [
      {
        input: "root = [1,2,3,null,null,4,5]",
        output: "[1,2,3,null,null,4,5]",
        explanation: "Original tree is serialized and then deserialized back to the same structure."
      }
    ],
    solutions: [
      {
        approach: "Brute Force",
        code: `public class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "null";
        return root.val + "," + serialize(root.left) + "," + serialize(root.right);
    }
    
    public TreeNode deserialize(String data) {
        Queue<String> queue = new LinkedList<>(Arrays.asList(data.split(",")));
        return deserializeHelper(queue);
    }
    
    private TreeNode deserializeHelper(Queue<String> queue) {
        String val = queue.poll();
        if (val.equals("null")) return null;
        
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = deserializeHelper(queue);
        node.right = deserializeHelper(queue);
        
        return node;
    }
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We use preorder traversal to serialize the tree into a string, with 'null' for null nodes. For deserialization, we split the string and reconstruct the tree."
      },
      {
        approach: "Optimal",
        code: `public class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "";
        
        StringBuilder sb = new StringBuilder();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node == null) {
                sb.append("null,");
                continue;
            }
            
            sb.append(node.val + ",");
            queue.offer(node.left);
            queue.offer(node.right);
        }
        
        return sb.toString();
    }
    
    public TreeNode deserialize(String data) {
        if (data.isEmpty()) return null;
        
        String[] values = data.split(",");
        TreeNode root = new TreeNode(Integer.parseInt(values[0]));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        for (int i = 1; i < values.length; i += 2) {
            TreeNode parent = queue.poll();
            
            if (!values[i].equals("null")) {
                parent.left = new TreeNode(Integer.parseInt(values[i]));
                queue.offer(parent.left);
            }
            
            if (i + 1 < values.length && !values[i + 1].equals("null")) {
                parent.right = new TreeNode(Integer.parseInt(values[i + 1]));
                queue.offer(parent.right);
            }
        }
        
        return root;
    }
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(w) where w is maximum width of tree",
        explanation: "We use level-order traversal (BFS) to serialize and deserialize the tree. This approach is more efficient for balanced trees and easier to implement."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    difficulty: "Hard",
    category: "trees"
  },
  {
    id: 56,
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    description: "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
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
    solutions: [
      {
        approach: "Brute Force",
        code: `public TreeNode buildTree(int[] preorder, int[] inorder) {
    return buildTreeHelper(preorder, 0, preorder.length - 1,
                         inorder, 0, inorder.length - 1);
}

private TreeNode buildTreeHelper(int[] preorder, int preStart, int preEnd,
                               int[] inorder, int inStart, int inEnd) {
    if (preStart > preEnd) return null;
    
    TreeNode root = new TreeNode(preorder[preStart]);
    
    int rootIndex = 0;
    for (int i = inStart; i <= inEnd; i++) {
        if (inorder[i] == root.val) {
            rootIndex = i;
            break;
        }
    }
    
    int leftSubtreeSize = rootIndex - inStart;
    
    root.left = buildTreeHelper(preorder, preStart + 1, preStart + leftSubtreeSize,
                              inorder, inStart, rootIndex - 1);
    
    root.right = buildTreeHelper(preorder, preStart + leftSubtreeSize + 1, preEnd,
                               inorder, rootIndex + 1, inEnd);
    
    return root;
}`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        explanation: "For each node in preorder traversal, we search for its position in inorder traversal to determine left and right subtrees."
      },
      {
        approach: "Optimal",
        code: `public TreeNode buildTree(int[] preorder, int[] inorder) {
    Map<Integer, Integer> inorderMap = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) {
        inorderMap.put(inorder[i], i);
    }
    
    return buildTreeHelper(preorder, 0, preorder.length - 1,
                         inorder, 0, inorder.length - 1,
                         inorderMap);
}

private TreeNode buildTreeHelper(int[] preorder, int preStart, int preEnd,
                               int[] inorder, int inStart, int inEnd,
                               Map<Integer, Integer> inorderMap) {
    if (preStart > preEnd) return null;
    
    TreeNode root = new TreeNode(preorder[preStart]);
    int rootIndex = inorderMap.get(root.val);
    int leftSubtreeSize = rootIndex - inStart;
    
    root.left = buildTreeHelper(preorder, preStart + 1, preStart + leftSubtreeSize,
                              inorder, inStart, rootIndex - 1,
                              inorderMap);
    
    root.right = buildTreeHelper(preorder, preStart + leftSubtreeSize + 1, preEnd,
                               inorder, rootIndex + 1, inEnd,
                               inorderMap);
    
    return root;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We use a HashMap to store indices of values in inorder traversal for O(1) lookup. This eliminates the need to search for root position in inorder traversal."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    difficulty: "Medium",
    category: "trees"
  },
  {
    id: 57,
    title: "Validate Binary Search Tree",
    description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys less than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key. Both the left and right subtrees must also be binary search trees.",
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
    solutions: [
      {
        approach: "Brute Force",
        code: `public boolean isValidBST(TreeNode root) {
    List<Integer> values = new ArrayList<>();
    inorder(root, values);
    
    for (int i = 1; i < values.size(); i++) {
        if (values.get(i) <= values.get(i-1)) {
            return false;
        }
    }
    
    return true;
}

private void inorder(TreeNode root, List<Integer> values) {
    if (root == null) return;
    inorder(root.left, values);
    values.add(root.val);
    inorder(root.right, values);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "We perform inorder traversal to get values in sorted order. A valid BST will have strictly increasing values."
      },
      {
        approach: "Optimal",
        code: `public boolean isValidBST(TreeNode root) {
    return isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private boolean isValidBST(TreeNode node, long min, long max) {
    if (node == null) return true;
    
    if (node.val <= min || node.val >= max) {
        return false;
    }
    
    return isValidBST(node.left, min, node.val) &&
           isValidBST(node.right, node.val, max);
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h) where h is height of tree",
        explanation: "We use a recursive approach with valid ranges for each node. Each node's value must be within the valid range determined by its ancestors."
      }
    ],
    leetCodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
    difficulty: "Medium",
    category: "trees"
  }
];