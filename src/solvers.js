/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  for (let i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }
  return solution.rows();
  // Time complexity of refactored

  //Original solution: (does not have great time complexity, so refactoring)
  // var solution = new Board({n: n});

  // for (let r = 0; r < n; r++) {
  //   for (let c = 0; c < n; c++) {
  //     solution.togglePiece(r, c);
  //     if (solution.hasAnyRooksConflicts()) {
  //       solution.togglePiece(r, c);
  //     }
  //   }
  // }

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution.rows();
};
// O(n^n)

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
/*
Start at top left square, and toggle a piece, then move through to the next available square with no conflicts. Toggle it and move again. When no more spots are left, we have a solution, and we increment, then we step backward one square. See if that square had another spot it can move to. Do the same thing again until all solutions have been stepped through. Return the counter variable.
*/
window.countNRooksSolutions = function(n) {
  // leaving our original solution to show that we figured out the logic
  // refactoring to solve in no time at all based on a discovery that the solutions for n board is the same as n factorial
  let factorial = 1;
  for (let i = 2; i <= n; i++) {
    factorial *= i;
  }
  console.log('Number of solutions for ' + n + ' rooks:', factorial);
  return factorial;

  // var solutionCount = 0;
  // var board = new Board({n: n});
  // var indexes = Array(n);

  // let solver = function(row) {

  //   if (row === n) {
  //     solutionCount++;
  //     return;
  //   } else {
  //     for (let i = 0; i < n; i++) {
  //       if (indexes[i]) {
  //         continue;
  //       }
  //       board.togglePiece(row, i);
  //       indexes[i] = 1;
  //       solver(row + 1);
  //       board.togglePiece(row, i);
  //       indexes[i] = 0;
  //     }
  //   }
  // };
  // solver(0);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};
// O(n^n) before Advanced Content optimization

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  let solved = false;
  var colIndexes = Array(n);
  var majorIndexesLength = n === 0 ? 0 : n * 2 - 1;
  var majorIndexes = Array(majorIndexesLength);

  let solver = function(row) {
    if (row === n) {
      solved = true;
    } else {
      // for (let i = 0; i < n; i++) {
      //   solution.togglePiece(row, i);
      //   if (solution.hasAnyQueensConflicts()) {
      //     solution.togglePiece(row, i);
      //   } else {
      //     solver(row + 1);
      //     if (solved) {
      //       return;
      //     }
      //     solution.togglePiece(row, i);
      //   }
      // }

      //Solution below uses an array to store indexes that have already been placed to avoid having to search repeatedly. We cut On2 time complexity down to constant time lookup for everything but minor diagonal conflicts.
      for (let i = 0; i < n; i++) {
        if (colIndexes[i] || majorIndexes[(i - row + (n - 1))]) {
          continue;
        }
        solution.togglePiece(row, i);
        colIndexes[i] = 1;
        majorIndexes[(i - row + (n - 1))] = 1;
        if (solution.hasAnyMinorDiagonalConflicts()) {
          solution.togglePiece(row, i);
          colIndexes[i] = 0;
          majorIndexes[(i - row + (n - 1))] = 0;
        } else {
          solver(row + 1);
          if (solved) {
            return;
          }
          solution.togglePiece(row, i);
          colIndexes[i] = 0;
          majorIndexes[(i - row + (n - 1))] = 0;
        }
      }
    }
  };
  solver(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};
// O(n^n)

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  //I don't know if we'll be able to code this, but I want to share our finding anyway. We have found a way using symmetry to cut time complexity to

  var solutionCount = 0;
  var halfCount = 0;
  var midCount = 0;
  //if n is 2 or 3, return 0;
  if (n === 2 || n === 3) {
    return 0;
  }

  var board = new Board({n: n});
  var colIndexes = Array(n);
  var majorIndexesLength = n === 0 ? 0 : n * 2 - 1;
  var majorIndexes = Array(majorIndexesLength);
  let solver = function(row) {

    if (row === n) {
      solutionCount++;
      return;
    } else {
      for (let i = 0; i < n; i++) {
        if (colIndexes[i] || majorIndexes[(i - row + (n - 1))]) {
          continue;
        }
        board.togglePiece(row, i);
        colIndexes[i] = 1;
        majorIndexes[(i - row + (n - 1))] = 1;
        if (board.hasAnyMinorDiagonalConflicts()) {
          board.togglePiece(row, i);
          colIndexes[i] = 0;
          majorIndexes[(i - row + (n - 1))] = 0;
        } else {
          solver(row + 1);
          board.togglePiece(row, i);
          colIndexes[i] = 0;
          majorIndexes[(i - row + (n - 1))] = 0;
        }
      }
    }
  };
  if (n > 3 && n % 2 === 0) {
    for (let h = 0; h < n / 2; h++) {
      board.togglePiece(0, h);
      colIndexes[h] = 1;
      majorIndexes[(h - 0 + (n - 1))] = 1;
      solver(1);
      board.togglePiece(0, h);
      colIndexes[h] = 0;
      majorIndexes[(h - 0 + (n - 1))] = 0;
    }
    return solutionCount * 2;
  }


  solver(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
// O(n^n)