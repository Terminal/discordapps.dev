import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.module.scss';
import ConstructCSS from '../../../helpers/ConstructCSS';

class Toasts extends Component {
  render() {
    const { toasts } = this.props.toasts;
    return (
      <div className={styles.toastContainer}>
        {toasts
          .map(toast => (
            <div key={toast.id} className={ConstructCSS(styles.toastDiv, toast.leave && styles.toastLeave)}>
              <div className={styles.timeout} style={{ animationDuration: `${toast.timeout / 1000}s` }} />
              <span
                style={{
                  backgroundColor: toast.colour
                }}
                className={styles.toast}
              >{toast.content}</span>
            </div>
          ))}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { toasts } = state;
  return { toasts };
}

export default connect(mapStateToProps)(Toasts);
