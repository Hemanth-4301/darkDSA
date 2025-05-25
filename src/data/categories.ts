import { Category } from '../types';
import { BookOpenCheck, Book, MousePointerSquareDashed, Fingerprint, SlidersHorizontal, SquareStack, Search, ListTree, BrainCircuit, GitFork, Network, HeartPulse, BarChartBig, ListFilter, Calendar, Compass, CircleDot } from 'lucide-react';

export const categories: Category[] = [
  {
    id: 'arrays',
    name: 'Arrays',
    description: 'Problems focused on array manipulation, searching, and sorting.',
    icon: 'ListFilter',
    count: 12
  },
  {
    id: 'twoPointers',
    name: 'Two Pointers',
    description: 'Problems that utilize the two-pointer technique for efficient array traversal.',
    icon: 'MousePointerSquareDashed',
    count: 5
  },
  {
    id: 'slidingWindow',
    name: 'Sliding Window',
    description: 'Problems that involve a window of elements that slides through an array or string.',
    icon: 'SlidersHorizontal',
    count: 6
  },
  {
    id: 'stack',
    name: 'Stack',
    description: 'Problems that utilize stack data structures or LIFO principles.',
    icon: 'SquareStack',
    count: 7
  },
  {
    id: 'binarySearch',
    name: 'Binary Search',
    description: 'Problems that use binary search algorithms for efficient searching.',
    icon: 'Search',
    count: 7
  },
  {
    id: 'linkedList',
    name: 'Linked List',
    description: 'Problems that involve manipulating linked lists and pointers.',
    icon: 'GitFork',
    count: 10
  },
  {
    id: 'trees',
    name: 'Trees',
    description: 'Problems involving tree data structures, traversals, and operations.',
    icon: 'ListTree',
    count: 10
  },
  {
    id: 'tries',
    name: 'Tries',
    description: 'Problems that utilize the trie data structure for efficient string operations.',
    icon: 'Network',
    count: 3
  },
  {
    id: 'heap',
    name: 'Heap / Priority Queue',
    description: 'Problems that use heap data structures for priority-based operations.',
    icon: 'BarChartBig',
    count: 5
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    description: 'Problems that use backtracking algorithms to find all possible solutions.',
    icon: 'Fingerprint',
    count: 6
  },
  {
    id: 'graphs',
    name: 'Graphs',
    description: 'Problems involving graph traversal, shortest paths, and connectivity.',
    icon: 'Network',
    count: 7
  },
  {
    id: 'dp1d',
    name: '1D Dynamic Programming',
    description: 'Problems that use one-dimensional dynamic programming techniques.',
    icon: 'BrainCircuit',
    count: 10
  },
  {
    id: 'dp2d',
    name: '2D Dynamic Programming',
    description: 'Problems that use two-dimensional dynamic programming techniques.',
    icon: 'BrainCircuit',
    count: 6
  },
  {
    id: 'greedy',
    name: 'Greedy',
    description: 'Problems that can be solved using the greedy algorithm approach.',
    icon: 'Compass',
    count: 8
  },
  {
    id: 'intervals',
    name: 'Intervals',
    description: 'Problems involving interval manipulation and scheduling.',
    icon: 'Calendar',
    count: 5
  },
  {
    id: 'math',
    name: 'Math & Geometry',
    description: 'Problems that require mathematical or geometrical concepts.',
    icon: 'CircleDot',
    count: 5
  },
  {
    id: 'bit',
    name: 'Bit Manipulation',
    description: 'Problems that involve bit-level operations and manipulations.',
    icon: 'HeartPulse',
    count: 5
  }
];