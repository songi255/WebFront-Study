/*
    React로 생각하기

    1. 컴포넌트 계층 구조를 식별해낸다.
      - SearchBox 와 List 는 SearchTable 로 한번 크게 묶는게 맞다. (어차피 searchbox 값과 list 값을 연동해야 되니까)
    
    2. 상호작용이 없는, 걍 썡 구조로 조립부터 한다. ( 이건 생각을 안해도 할 수 있음 )
      - 이때, 변수 받아서 rendering 하는 내용까지는 작성한다.  
    
    3. state 를 사용하기 위해서, 최소화된 State 를 분리해내자
        - 시간이 지나도 안변하면 state 가 아님
        - 부모로부터 전달받나? state 가 아님.
        - 다른 데이터로 계산가능한가? state 가 아님.

    4. state 의 위치 결정. 어떤 컴포넌트가 어떤 state 가 필요한 지 생각해보고, 그 값이 다른데서도 공유하거나 해야하면 부모에 있는게 맞다.
        - 혹은 부모 보다 더 위의 어떤 공통 Component 에 있을수도 있다. 예를들어 context..
        - useState 로 상태 전달.

     
    그외 몇가지 지침
      - 조기에 최적화하지 마라.
    

    완성 예제 : https://codesandbox.io/s/v5qb74?file=/App.js&utm_medium=sandpack
*/

import { useState } from "react";

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState(""); // state 식별 (state 와 setter 정의)
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText} // state 주입
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText} // setter 추가
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} // 받은 state 의 setter 연동
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
