const board =
  document.getElementById("board");
const workspace =
  document.querySelector(".workspace");

const addNoteBtn =
  document.getElementById("addNoteBtn");

const addImageBtn =
  document.getElementById("addImageBtn");

const addDescImageBtn =
  document.getElementById("addDescImageBtn");

const addTodoBtn =
  document.getElementById("addTodoBtn");

// FILE INPUT

const imageInput =
  document.createElement("input");

imageInput.type = "file";

imageInput.accept = "image/*";

imageInput.style.display = "none";

document.body.appendChild(imageInput);

// MODAL ELEMENTS

const imageModal =
  document.getElementById("imageModal");

const uploadArea =
  document.getElementById("uploadArea");

const chooseFileBtn =
  document.getElementById("chooseFileBtn");

const imageURLInput =
  document.getElementById("imageURLInput");

const addURLBtn =
  document.getElementById("addURLBtn");

// CURRENT MODE

let currentMode = "note";

// REMOVE ACTIVE TOOLS

function removeActiveTools() {

  document
    .querySelectorAll(".tool")
    .forEach((tool) => {

      tool.classList.remove("active");
    });
}
function toggleEmptyState() {

  const boardTitle =
    document.querySelector(
      ".board-title"
    );

  const notes =
    document.querySelectorAll(
      ".note"
    );

  if (notes.length > 0) {

    boardTitle.style.opacity = 0;

    boardTitle.style.pointerEvents =
      "none";

    boardTitle.style.transform =
      "translateX(-50%) scale(0.9)";

  } else {

    boardTitle.style.opacity = 1;

    boardTitle.style.transform =
      "translateX(-50%) scale(1)";
  }
}
// NOTE TOOL

addNoteBtn.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    currentMode = "note";

    removeActiveTools();

    addNoteBtn.classList.add(
      "active"
    );
  }
);

// IMAGE TOOL

addImageBtn.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    currentMode = "image";

    removeActiveTools();

    addImageBtn.classList.add(
      "active"
    );

    imageModal.style.display =
      "flex";
  }
);

// DESCRIPTIVE IMAGE TOOL

addDescImageBtn.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    currentMode = "desc-image";

    removeActiveTools();

    addDescImageBtn.classList.add(
      "active"
    );

    imageModal.style.display =
      "flex";
  }
);

// TODO TOOL

addTodoBtn.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    currentMode = "todo";

    removeActiveTools();

    addTodoBtn.classList.add(
      "active"
    );
  }
);

// EVENT CAPTURING

board.addEventListener(
  "click",
  () => {

    console.log(
      "Board Capture Phase"
    );

  },
  true
);

// EVENT BUBBLING

board.addEventListener(
  "click",
  (event) => {

    console.log(
      "Board Bubble Phase"
    );

    if (
      event.target.closest(".note")
    ) {
      return;
    }

    if (
      currentMode === "note"
    ) {

      createNote(event);

    } else if (
      currentMode === "todo"
    ) {

      createTodo(event);
    }
  }
);

// CREATE NOTE

function createNote(event) {

  const note =
    document.createElement("div");

  note.classList.add("note");

  note.style.left =
    `${event.clientX - 120}px`;

  note.style.top =
    `${event.clientY - 80}px`;

  note.innerHTML = `

    <div class="note-header">

      <input
        class="note-title-input"
        value="Feedback"
      />

      <div class="note-actions">

        <button class="edit-btn">
          <i class="fa-solid fa-pen"></i>
        </button>

        <button class="delete-btn">
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>

    </div>

    <p class="note-text">
      Double click edit ideas...
    </p>

    <textarea
      style="display:none;"
    ></textarea>
  `;

  board.appendChild(note);

  addNoteEvents(note);

  smoothAppear(note);

  toggleEmptyState();
}

// CREATE TODO

function createTodo(event) {

  const note =
    document.createElement("div");

  note.classList.add(
    "note",
    "todo-note"
  );

  note.style.left =
    `${event.clientX - 120}px`;

  note.style.top =
    `${event.clientY - 80}px`;

  note.innerHTML = `

    <div class="note-header">

      <input
        class="note-title-input"
        value="Todo List"
      />

      <div class="note-actions">

        <button class="delete-btn">
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>

    </div>

    <div class="todo-list">

      <div class="todo-item">

        <input type="checkbox" />

        <input
          class="todo-input"
          value="New Task"
        />

      </div>

    </div>

    <button class="add-task-btn">
      + Add Task
    </button>
  `;

  board.appendChild(note);

  smoothAppear(note);

  addDrag(note);

  addResize(note);

  toggleEmptyState();
  const deleteBtn =
    note.querySelector(".delete-btn");

  deleteBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      note.remove();
      toggleEmptyState();
    }
  );

  const addTaskBtn =
    note.querySelector(".add-task-btn");

  const todoList =
    note.querySelector(".todo-list");

  addTaskBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      const item =
        document.createElement("div");

      item.classList.add(
        "todo-item"
      );

      item.innerHTML = `

        <input type="checkbox" />

        <input
          class="todo-input"
          value="New Task"
        />
      `;

      todoList.appendChild(item);
    }
  );
}

// CREATE IMAGE

function createImageCard(
  imageURL,
  event
) {

  const note =
    document.createElement("div");

  note.classList.add(
    "note",
    "image-note"
  );

  note.style.left =
    `${event.clientX - 120}px`;

  note.style.top =
    `${event.clientY - 80}px`;

  note.innerHTML = `

    <div class="note-header">

      <input
        class="note-title-input"
        value="Image"
      />

      <div class="note-actions">

        <button class="delete-btn">
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>

    </div>

    <img src="${imageURL}" />
  `;

  board.appendChild(note);

  smoothAppear(note);

  addDrag(note);

  addResize(note);

  toggleEmptyState();
  const deleteBtn =
    note.querySelector(".delete-btn");

  deleteBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      note.remove();

      toggleEmptyState();
    }
  );
}

// CREATE DESCRIPTIVE IMAGE

function createDescriptiveImage(
  imageURL,
  event
) {

  const note =
    document.createElement("div");

  note.classList.add(
    "note",
    "desc-image-note"
  );

  note.style.left =
    `${event.clientX - 120}px`;

  note.style.top =
    `${event.clientY - 80}px`;

  note.innerHTML = `

    <div class="note-header">

      <input
        class="note-title-input"
        value="Moodboard"
      />

      <div class="note-actions">

        <button class="delete-btn">
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>

    </div>

    <img src="${imageURL}" />

    <textarea
      class="desc-textarea"
      placeholder="Write description..."
    ></textarea>
  `;

  board.appendChild(note);

  smoothAppear(note);

  addDrag(note);

  addResize(note);

  toggleEmptyState();

  const deleteBtn =
    note.querySelector(".delete-btn");

  deleteBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      note.remove();


      toggleEmptyState();
    }
  );
}

// NOTE EVENTS

function addNoteEvents(note) {

  const editBtn =
    note.querySelector(".edit-btn");

  const deleteBtn =
    note.querySelector(".delete-btn");

  const text =
    note.querySelector(".note-text");

  const textarea =
    note.querySelector("textarea");

  note.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      console.log("Note Bubble");
    }
  );

  // EDIT

  editBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      if (
        editBtn.classList.contains(
          "edit-btn"
        )
      ) {

        textarea.style.display =
          "block";

        text.style.display =
          "none";

        textarea.value =
          text.textContent;

        editBtn.innerHTML =
          `<i class="fa-solid fa-check"></i>`;

        editBtn.classList.remove(
          "edit-btn"
        );

        editBtn.classList.add(
          "save-btn"
        );

      } else {

        text.textContent =
          textarea.value;

        textarea.style.display =
          "none";

        text.style.display =
          "block";

        editBtn.innerHTML =
          `<i class="fa-solid fa-pen"></i>`;

        editBtn.classList.remove(
          "save-btn"
        );

        editBtn.classList.add(
          "edit-btn"
        );
      }
    }
  );

  // DELETE

  deleteBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      note.remove();

      toggleEmptyState();
    }
  );

  // DOUBLE CLICK EDIT

  text.addEventListener(
    "dblclick",
    (event) => {

      event.stopPropagation();

      textarea.style.display =
        "block";

      text.style.display =
        "none";

      textarea.value =
        text.textContent;

      textarea.focus();
    }
  );

  // SAVE

  textarea.addEventListener(
    "blur",
    () => {

      text.textContent =
        textarea.value;

      textarea.style.display =
        "none";

      text.style.display =
        "block";
    }
  );

  addDrag(note);

  addResize(note);
}

// APPEAR

function smoothAppear(note) {

  note.style.opacity = 0;

  note.style.transform =
    "scale(0.8)";

  requestAnimationFrame(() => {

    note.style.transition =
      "0.25s ease";

    note.style.opacity = 1;

    note.style.transform =
      "scale(1)";
  });
}

// DRAG

function addDrag(note) {

  let isDragging = false;

  let offsetX = 0;

  let offsetY = 0;

  note.addEventListener(
    "mousedown",
    (event) => {

      if (
        event.target.closest("button") ||
        event.target.closest("textarea") ||
        event.target.closest(".note-title-input")
      ) {
        return;
      }

      isDragging = true;

      offsetX =
        event.clientX -
        note.offsetLeft;

      offsetY =
        event.clientY -
        note.offsetTop;

      note.style.zIndex = 999;

      note.style.transition =
        "none";

      event.stopPropagation();
    }
  );

  document.addEventListener(
    "mousemove",
    (event) => {

      if (!isDragging) return;

      note.style.left =
        `${event.clientX - offsetX}px`;

      note.style.top =
        `${event.clientY - offsetY}px`;
    }
  );

  document.addEventListener(
    "mouseup",
    () => {

      isDragging = false;

      note.style.transition =
        "0.2s ease";
    }
  );
}

// RESIZE

function addResize(note) {

  const resizeHandle =
    document.createElement("div");

  resizeHandle.style.position =
    "absolute";

  resizeHandle.style.width =
    "18px";

  resizeHandle.style.height =
    "18px";

  resizeHandle.style.right =
    "8px";

  resizeHandle.style.bottom =
    "8px";

  resizeHandle.style.cursor =
    "nwse-resize";

  resizeHandle.style.zIndex =
    "999";

  note.appendChild(resizeHandle);

  let isResizing = false;

  let startX = 0;

  let startY = 0;

  let startWidth = 0;

  let startHeight = 0;

  resizeHandle.addEventListener(
    "mousedown",
    (event) => {

      isResizing = true;

      startX = event.clientX;

      startY = event.clientY;

      startWidth =
        note.offsetWidth;

      startHeight =
        note.offsetHeight;

      event.stopPropagation();
    }
  );

  document.addEventListener(
    "mousemove",
    (event) => {

      if (!isResizing) return;

      note.style.width =
        `${startWidth +
        (event.clientX - startX)}px`;

      note.style.height =
        `${startHeight +
        (event.clientY - startY)}px`;
    }
  );

  document.addEventListener(
    "mouseup",
    () => {

      isResizing = false;
    }
  );
}

// CLOSE MODAL

imageModal.addEventListener(
  "click",
  (event) => {

    if (
      event.target === imageModal
    ) {

      imageModal.style.display =
        "none";
    }
  }
);

// CHOOSE FILE

chooseFileBtn.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    imageInput.click();
  }
);

// CLICK UPLOAD AREA

uploadArea.addEventListener(
  "click",
  () => {

    imageInput.click();
  }
);

// FILE CHANGE
imageInput.addEventListener(
  "change",
  () => {

    const file =
      imageInput.files[0];

    if (!file) return;

    const imageURL =
      URL.createObjectURL(file);

    const position = {

      clientX:
        window.innerWidth / 2,

      clientY:
        window.innerHeight / 2
    };

    if (
      currentMode === "desc-image"
    ) {

      createDescriptiveImage(
        imageURL,
        position
      );

    } else {

      createImageCard(
        imageURL,
        position
      );
    }

    imageModal.style.display =
      "none";
  }
);
// IMAGE URL
addURLBtn.addEventListener(
  "click",
  () => {

    const url =
      imageURLInput.value;

    if (!url) return;

    const position = {

      clientX:
        window.innerWidth / 2,

      clientY:
        window.innerHeight / 2
    };

    if (
      currentMode === "desc-image"
    ) {

      createDescriptiveImage(
        url,
        position
      );

    } else {

      createImageCard(
        url,
        position
      );
    }

    imageURLInput.value = "";

    imageModal.style.display =
      "none";
  }
);
// DRAG DROP
uploadArea.addEventListener(
  "dragover",
  (event) => {

    event.preventDefault();

    uploadArea.style.background =
      "rgba(95,114,255,0.1)";
  }
);
uploadArea.addEventListener(
  "dragleave",
  () => {

    uploadArea.style.background =
      "transparent";
  }
);
uploadArea.addEventListener(
  "drop",
  (event) => {

    event.preventDefault();

    const file =
      event.dataTransfer.files[0];

    if (!file) return;

    const imageURL =
      URL.createObjectURL(file);

    const position = {

      clientX:
        window.innerWidth / 2,

      clientY:
        window.innerHeight / 2
    };

    if (
      currentMode === "desc-image"
    ) {

      createDescriptiveImage(
        imageURL,
        position
      );

    } else {

      createImageCard(
        imageURL,
        position
      );
    }

    imageModal.style.display =
      "none";
  }
);

//New functinalities
// ==========================
// CLEAR BOARD
// ==========================

clearBtn.addEventListener(
  "click",
  () => {

    const notes =
      document.querySelectorAll(
        ".note"
      );

    notes.forEach((note) => {

      note.remove();
      toggleEmptyState();
    });
  }
);

// ==========================
// AUTO ARRANGE
// ==========================

arrangeBtn.addEventListener(
  "click",
  () => {

    const notes =
      document.querySelectorAll(
        ".note"
      );

    const cardsPerRow = 5;

    const gap = 30;

    const startX = 120;

    const startY = 180;

    let currentX = startX;

    let currentY = startY;

    let rowHeight = 0;

    notes.forEach((note, index) => {

      note.style.transition =
        "0.35s ease";

      note.style.left =
        `${currentX}px`;

      note.style.top =
        `${currentY}px`;

      rowHeight = Math.max(
        rowHeight,
        note.offsetHeight
      );

      currentX +=
        note.offsetWidth + gap;

      // NEXT ROW AFTER 6 CARDS

      if (
        (index + 1) %
        cardsPerRow === 0
      ) {

        currentX = startX;

        currentY +=
          rowHeight + gap;

        rowHeight = 0;
      }
    });
  }
);
// ==========================
// SAVE LAYOUT
// ==========================

// ==========================
// SAVE LAYOUT
// ==========================

saveBtn.addEventListener(
  "click",
  () => {

    const notes =
      document.querySelectorAll(
        ".note"
      );

    const layout = [];

    notes.forEach((note) => {

      layout.push({

        html:
          note.innerHTML,

        left:
          note.style.left,

        top:
          note.style.top,

        width:
          note.style.width,

        height:
          note.style.height,

        classes:
          note.className
      });
    });

    localStorage.setItem(
      "feedback-board-layout",
      JSON.stringify(layout)
    );

    console.log(
      "Saved:",
      layout
    );

    alert("Board Saved");
  }
);

// ==========================
// LOAD LAYOUT
// ==========================
// ==========================
// LOAD LAYOUT
// ==========================

loadBtn.addEventListener(
  "click",
  () => {

    const savedLayout =
      localStorage.getItem(
        "feedback-board-layout"
      );

    if (!savedLayout) {

      alert("No saved layout found");

      return;
    }

    // CLEAR EXISTING

    document
      .querySelectorAll(".note")
      .forEach((note) => {

        note.remove();
      });

    const layout =
      JSON.parse(savedLayout);

    console.log(
      "Loaded:",
      layout
    );

    layout.forEach((item) => {

      const note =
        document.createElement("div");

      note.className =
        item.classes;

      note.innerHTML =
        item.html;

      note.style.left =
        item.left;

      note.style.top =
        item.top;

      note.style.width =
        item.width;

      note.style.height =
        item.height;

      // IMPORTANT

      workspace.appendChild(note);
      toggleEmptyState();

      // RESTORE EVENTS

      addDrag(note);

      addResize(note);

      // NORMAL NOTE

      if (
        note.querySelector(
          ".note-text"
        )
      ) {

        addNoteEvents(note);
      }

      // DELETE

      const deleteBtn =
        note.querySelector(
          ".delete-btn"
        );

      if (deleteBtn) {

        deleteBtn.addEventListener(
          "click",
          (event) => {

            event.stopPropagation();

            note.remove();
            toggleEmptyState();
          }
        );
      }

      // TODO SUPPORT

      const addTaskBtn =
        note.querySelector(
          ".add-task-btn"
        );

      if (addTaskBtn) {

        const todoList =
          note.querySelector(
            ".todo-list"
          );

        addTaskBtn.addEventListener(
          "click",
          (event) => {

            event.stopPropagation();

            const item =
              document.createElement(
                "div"
              );

            item.classList.add(
              "todo-item"
            );

            item.innerHTML = `

              <input type="checkbox" />

              <input
                class="todo-input"
                value="New Task"
              />
            `;

            todoList.appendChild(
              item
            );
          }
        );
      }
    });

    toggleEmptyState();
    alert("Board Loaded");
  }
);
// ==========================
// INITIAL STATE
// ==========================

toggleEmptyState();