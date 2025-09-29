  const form = document.getElementById("productForm");
  const paramsContainer = document.getElementById("parameters");
  const output = document.getElementById("output");

  function createParamRow(label = "", value = "") {
    const div = document.createElement("div");
    div.className = "row";
    div.innerHTML = `
      <input type="text" placeholder="Label" value="${label}">
      <input type="text" placeholder="Value" value="${value}">
      <button type="button" class="remove-btn">Delete</button>
    `;
    div.querySelector(".remove-btn").addEventListener("click", () => {
      div.remove();
    });
    return div;
  }

  document.getElementById("addParam").addEventListener("click", () => {
    paramsContainer.appendChild(createParamRow());
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const product = {
      name: data.get("name"),
      type: data.get("type"),
      id: Number(data.get("id")),
      code: data.get("code"),
      price: data.get("price"),
      visible: "true",
      featured: "false",
      inStock: data.get("inStock"),
      alsoBuyId: data.get("alsoBuyId")
        ? data.get("alsoBuyId").split(",").map(x => x.trim())
        : [],
      img: data.get("img")
        ? data.get("img").split(",").map(x => x.trim())
        : [],
      power: data.get("power"),
      efficiency: data.get("efficiency"),
      electrodeDiameterMax: data.get("electrodeDiameterMax"),
      shortDescription: data.get("shortDescription"),
      fullDescription: data.get("fullDescription"),
      parameters: []
    };

    // собираем параметры
    document.querySelectorAll(".param-row").forEach(row => {
      const [label, value] = row.querySelectorAll("input");
      if (label.value.trim() && value.value.trim()) {
        product.parameters.push({
          label: label.value,
          value: value.value
        });
      }
    });

    output.textContent = JSON.stringify(product, null, 2);
  });


const textareas = document.getElementsByClassName("admin-area-input");

for (let i = 0; i < textareas.length; i++) {
  textareas[i].addEventListener("input", function() {
    this.style.height = "auto";         // сбросить
    this.style.height = this.scrollHeight + "px"; // установить высоту
  });
}


const addBtn = document.getElementById("products-edit-add");
const editBtn = document.getElementById("products-edit-update");
const removeBtn = document.getElementById("products-edit-remove");

addBtn.addEventListener("click", generateAddProductForm);
editBtn.addEventListener("click", generateEditProductForm);

function generateAddProductForm() {
  document.getElementById("products-edit-panel").innerHTML = `
                    <form id="productForm">
                    <h2>Add Product</h2>

                    <input type="text" name="name" placeholder="Name" />
                    <input type="text" name="type" placeholder="Type" />

                    <div class="row">
                      <input type="number" name="id" placeholder="ID" />
                      <input type="text" name="code" placeholder="Code" />
                    </div>

                    <input type="text" name="price" placeholder="Price" />
                    <input
                      type="text"
                      name="inStock"
                      placeholder="Stock quantity"
                    />
                    <input
                      type="text"
                      name="alsoBuyId"
                      placeholder="AlsoBuy IDs (comma-separated)"
                    />
                    <input
                      type="text"
                      name="img"
                      placeholder="Image URLs (comma-separated)"
                    />

                    <div class="row">
                      <input type="text" name="power" placeholder="Power" />
                      <input
                        type="text"
                        name="efficiency"
                        placeholder="Efficiency"
                      />
                      <input
                        type="text"
                        name="electrodeDiameterMax"
                        placeholder="Max Electrode Diameter"
                      />
                    </div>

                    <textarea
                      class="admin-area-input"
                      name="shortDescription"
                      placeholder="Short Description (HTML)"
                      rows="4"
                    ></textarea>
                    <textarea
                      class="admin-area-input"
                      name="fullDescription"
                      placeholder="Full Description (HTML)"
                      rows="6"
                    ></textarea>

                    <h3>Parameters</h3>
                    <div id="parameters"></div>
                    <button type="button" id="addParam">+ Add Parameter</button>

                    <button type="submit">Save Product</button>
                  </form>
  `
}

function generateEditProductForm() {
    document.getElementById("products-edit-panel").innerHTML = `
                    <h2>Edit Product</h2>
  `
}