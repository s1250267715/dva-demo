import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
import { observable} from "mobx";

class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}
console.log(Todo,'todo');

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);
/**
 * 到这里，我们已经单独完成了 model 和 component，那么他们如何串联起来呢?

dva 提供了 connect 方法。如果你熟悉 redux，这个 connect 就是 react-redux 的 connect 。
 */