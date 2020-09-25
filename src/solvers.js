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
  // for (let i = 0; i < n; i++) {
  //   solution.togglePiece(i, i);
  // }
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      solution.togglePiece(r, c);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(r, c);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
/*
Start at top left square, and toggle a piece, then move through to the next available square with no conflicts. Toggle it and move again. When no more spots are left, we have a solution, and we increment, then we step backward one square. See if that square had another spot it can move to. Do the same thing again until all solutions have been stepped through. Return the counter variable.
*/
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  let solver = function(row) {

    if (row === n) {
      solutionCount++;
      return;
    } else {
      for (let i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(row, i);
        } else {
          solver(row + 1);
          board.togglePiece(row, i);
        }
      }
    }
  };
  solver(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // if (n === 0 || n === 2 || n === 3) {
  //   return 0;
  // }
  var solution = new Board({n: n});
  let solved = false;

  let solver = function(row) {
    if (row === n) {

      solved = true;
      //console.log('return', solution.rows(), row);
      return solution.rows();
    } else {
      for (let i = 0; i < n; i++) {
        solution.togglePiece(row, i);
        //console.log('for board:', solution, 'rows', solution.rows());
        if (solution.hasAnyQueensConflicts()) {
          solution.togglePiece(row, i);
        } else {
          solver(row + 1);
          if (solved) {
            return solution.rows();
          }
          solution.togglePiece(row, i);
        }
      }
    }
  };
  solver(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  //if n is 2 or 3, return 0;
  if (n === 2 || n === 3) {
    return 0;
  }

  var board = new Board({n: n});

  let solver = function(row) {

    if (row === n) {
      solutionCount++;
      return;
    } else {
      for (let i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(row, i);
        } else {
          solver(row + 1);
          board.togglePiece(row, i);
        }
      }
    }
  };
  solver(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
