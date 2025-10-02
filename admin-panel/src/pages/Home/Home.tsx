import React from "react";

export function Home() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const productData: Record<string, any> = {};
    const productFiles: File[] = [];

    formData.forEach((value, key) => {
      if (key === "img") {
        if (value instanceof File && value.size > 0) {
          productFiles.push(value);
        }
      } else {
        productData[key] = value;
      }
    });

    const uploadedUrls: string[] = [];
    for (const file of productFiles) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const res = await fetch("/cdn/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const result = await res.json();
      
      uploadedUrls.push(...result.files);
    }

    productData.images = uploadedUrls;
    console.log("Uploaded URLs:", uploadedUrls);
    

    console.log("Final product data:", productData);

    await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
  };

  return (
    <div className="admin-panel-wrap">
      <div className="admin-panel-products">
        <div className="panel-title">PRODUCTS</div>
        <div className="products-edit">
          <div id="products-edit-add" className="products-edit-add">
            <img
              className="products-edit-img"
              src="./assets/icons/icon-add-note.svg"
            />
            Add
          </div>
          <div id="products-edit-update" className="products-edit-update">
            <img
              className="products-edit-img"
              src="./assets/icons/icon-edit-pencil.svg"
            />
            Edit
          </div>
          <div className="products-edit-remove">
            <img
              className="products-edit-img"
              src="./assets/icons/icon-remove.svg"
            />
            Delete
          </div>
        </div>
        <div id="products-edit-panel">
          <form id="productForm" onSubmit={handleSubmit}>
            <h2>Add Product</h2>

            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="type" placeholder="Type" />

            <div className="row">
              <input type="number" name="id" placeholder="ID" />
              <input type="text" name="code" placeholder="Code" />
            </div>

            <input type="text" name="price" placeholder="Price" />
            <input type="text" name="inStock" placeholder="Stock quantity" />
            <input
              type="text"
              name="alsoBuyId"
              placeholder="AlsoBuy IDs (comma-separated)"
            />

            {/* Загрузка картинок */}
            <input type="file" name="img" multiple accept="image/*" />
            <input type="file" name="img" multiple accept="image/*" />
             <input type="file" name="img" multiple accept="image/*" />

            <div className="row">
              <input type="text" name="power" placeholder="Power" />
              <input type="text" name="efficiency" placeholder="Efficiency" />
              <input
                type="text"
                name="electrodeDiameterMax"
                placeholder="Max Electrode Diameter"
              />
            </div>

            <textarea
              className="admin-area-input"
              name="shortDescription"
              placeholder="Short Description (HTML)"
              rows={4}
            ></textarea>
            <textarea
              className="admin-area-input"
              name="fullDescription"
              placeholder="Full Description (HTML)"
              rows={6}
            ></textarea>

            <h3>Parameters</h3>
            <div id="parameters"></div>
            <button type="button" id="addParam">
              + Add Parameter
            </button>

            <button type="submit">Save Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}
