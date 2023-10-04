const { User, Cart, Product } = require("../../db");

const addItem = async (
  idUser,
  { id, nombre, precio, size, quantity, color }
) => {
  try {
    const cart = await Cart.findOne({ where: { UserId: idUser } });

    const cartBuscado = cart.product;

    const product = { id, nombre, precio, size, quantity, color };

    const user = await User.findByPk(idUser, { include: Cart });

    if (!user.Cart.product.length) {
      cartBuscado.push(product);
      await user.Cart.update({ product: cartBuscado });
    } else {
      for (let i = 0; i < user.Cart.product.length; i++) {
        console.log(i, user.Cart.product[i].id);
        if (product.id === user.Cart.product[i].id) {
          console.log("si es igual");
          if (
            product.size === user.Cart.product[i].size &&
            product.color === user.Cart.product[i].color
          ) {
            const mismoProduc = await user.Cart.product.filter((e) => {
              console.log("filter", e);
              if (
                e.id === product.id &&
                e.size === product.size &&
                e.color === product.color
              ) {
                console.log("entre");
                e.quantity += 1;
                return e;
              }
            });
            console.log(mismoProduc);
            await user.Cart.update({
              product: { quantity: mismoProduc.quantity },
            });
            console.log("se cambio");
          }
        }
      }
      // for (let i=0; i<)
    }

    //     for (let i=0; i<user.Cart.product.length; i++) {
    //         // console.log(i);
    //         // log
    //         if(!user.Cart.length) {
    //             console.log("entre");
    //                 cartBuscado.push(product)
    //                 await user.Cart.update({product: cartBuscado})

    //         }
    //     }
    // }
    // if(product.id !== user.Cart.product[i].id || product.size !== user.Cart.product[i].size || product.color !== user.Cart.product[i].color)  {
    //     val = product
    //     return
    // } else {
    //     val = {}
    //     product.quantity+1
    //     return
    //     // if(product.size === user.Cart.product[i].size && product.color === user.Cart.product[i].color) {
    //     // }

    // if(user.Cart[i].id === id) {
    //     console.log("sib es igualñ");
    // }

    // console.log("length", Object.entries(val).length);
    // if(Object.entries(val).length > 0){
    //     console.log("entre");
    //     cartBuscado.push(val)
    //     await user.Cart.update({product: cartBuscado})

    // } else {
    //     const buscop = user.Cart.product;
    //     console.log(buscop);
    //     console.log(quantity);
    // }
    // console.log(val);

    //     const user = await User.findByPk(idUser, {include: Cart});
    //     // const user = await User.findByPk(idUser);
    // //    console.log(id, nombre, precio, size, quantity, color);
    // const product  ={id, nombre, precio, size, quantity, color}
    // const cart = user.Cart
    // // console.log(user);

    // // if(!user) {
    // //     console.log("el usuario no tiene carrito");
    // // }

    // cart.product.push(product)

    // // console.log(cart.product.length );

    //     await user.Cart.update({product: cart.product} )
    //     await cart.save()
    //     console.log(user.Cart.product);

    // console.log(cart);

    // console.log(product);

    // const cart = user.Cart

    // cart.product.push(product)
    // console.log(cart);
    // await cart.update({ product: product});
    // user.Cart.product.push(product)
    //    console.log(user.Cart);

    // const cart = user.Cart
    // console.log(cart);

    //       if(!user || !user.Cart) {
    //         console.log("no existe carrito");
    //       }
    //   console.log(user);

    // for (const clothing of product.stock) {
    //         if (clothing.color === color) {
    //           for (let i = 0; i < clothing.sizeAndQuantity.length; i++) {
    //             if (clothing.sizeAndQuantity[i]?.size === size && clothing.sizeAndQuantity[i]?.quantity >= quantity) {
    //               await user.Cart.addProduct(product);
    //               return;
    //             }
    //           }

    //           return;
    //         }
    //       }
  } catch (error) {}
};

// const bsuquedateProduct = await Product.findOne({where: {name: product.name, image: product.image}})

// const carrito = await Cart.addProduct(bsuquedateProduct)

// console.log(bsuquedateProduct);
// console.log(carrito);

// await user.Cart?.addProduct(bsuquedateProduct, {through: { quantity: 1 }})

// console.log("con", user);

// console.log(id);
// const product = await Product.findByPk(idProduct)
// const user = await User.findByPk(idUser, {include: ShoppingCart})
// const cart = user.ShoppingCart

// await user.addProduct(product)

// console.log(product);

// const product = await Product.findByPk(id)

// console.log(cart);

module.exports = {
  addItem,
};
