/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

class OrderDetails extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  render() {
    const { id } = this.props;
    return (
      <Query
        query={SINGLE_ORDER_QUERY}
        variables={{
          id,
        }}
      >
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          const { order } = data;
          return (
            <OrderStyles>
              <Head>
                <title>React Shop - Order {order.id}</title>
              </Head>
              <p>
                <span>Order ID:</span>
                <span>{id}</span>
              </p>
              <p>
                <span>Charge</span>
                <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
              </p>
              <p>
                <span>Order Total</span>
                <span>{formatMoney(order.total)}</span>
              </p>
              <p>
                <span>Item Count</span>
                <span>{order.items.length}</span>
              </p>
              <div className="items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.title} />
                    <div className="item-details">
                      <p>{item.title}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Each: {formatMoney(item.price)}</p>
                      <p>Subtotal: {formatMoney(item.price * item.quantiy)}</p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </OrderStyles>
          );
        }}
      </Query>
    );
  }
}

export default OrderDetails;
