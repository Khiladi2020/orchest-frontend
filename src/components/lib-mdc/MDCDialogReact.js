import React from "react";
import { MDCDialog } from "@material/dialog";
import { RefManager, uuidv4 } from "../lib-utils";

// used only in orchest-webserver

export class MDCDialogReact extends React.Component {

  setAllowClose = (allowClose) => {
    this.mdc.escapeKeyAction = allowClose ? "close" : "";
    this.mdc.scrimClickAction = allowClose ? "close" : "";
  };

  constructor() {
    // @ts-ignore
    super();

    this.refManager = new RefManager();
  }
  componentDidMount() {
    this.mdc = new MDCDialog(this.refManager.refs.dialog);

    this.mdc.open();

    this.mdc.listen("MDCDialog:closed", () => {
      if (this.props.onClose) {
        this.props.onClose();
      }
    });
    this.mdc.listen("MDCDialog:opened", () => {
      if (this.props.onOpened) {
        this.props.onOpened();
      }
    });
  }

  close() {
    this.mdc.close();
  }

  render() {
    let id_uuid = uuidv4();

    const actions = React.isValidElement(this.props.actions)
      ? this.props.actions // render the given React elements
      : (this.props.actions)({
          setAllowClose: this.setAllowClose,
        }); // allows to call setAllowClose function when needed

    return (
      <div
        ref={this.refManager.nrefs.dialog}
        className="mdc-dialog"
        role="alertdialog"
        aria-modal="true"
        // @ts-ignore
        tabIndex="0"
        aria-labelledby={"dialog-title-" + id_uuid}
        aria-describedby={"dialog-content-" + id_uuid}
        data-test-id={this.props["data-test-id"]}
      >
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <h2 className="mdc-dialog__title" id={"dialog-title-" + id_uuid}>
                {this.props.title}
              </h2>
              <div
                className="mdc-dialog__content"
                id={"dialog-content-" + id_uuid}
              >
                {this.props.content}
              </div>
              <footer className="mdc-dialog__actions">{actions}</footer>
            </form>
          </div>
        </div>
        <div className="mdc-dialog__scrim"></div>
      </div>
    );
  }
}
