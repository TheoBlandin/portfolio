var gifMergeSort = document.getElementById("gif-merge-sort");
var gifRunning = true;

gifMergeSort.onclick = function () {
    gifRunning = !gifRunning;
    if (gifRunning) {
        gifMergeSort.src = "assets/screens/merge-sort.gif";
    } else {
        gifMergeSort.src = "assets/screens/gif-stopped.png";
    }
};

gifMergeSort.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        gifRunning = !gifRunning;
        if (gifRunning) {
            gifMergeSort.src = "assets/screens/merge-sort.gif";
        } else {
            gifMergeSort.src = "assets/screens/gif-stopped.png";
        }
    }
})