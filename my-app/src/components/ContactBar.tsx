import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";
import { X } from "lucide-react"; // optional, remove if you don't use lucide

export function ContactBar() {
  return (
    <nav className="contact-bar">
      <Dialog.Root>
        <Dialog.Trigger asChild>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="ghost" size="4">Contact</Button>
            </div>
        
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="contact-dialog__overlay" />
          <Dialog.Content className="contact-dialog__content">
            <div className="contact-dialog__header">
              <Dialog.Title className="contact-dialog__title">
                Contact Me
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="contact-dialog__icon-button" aria-label="Close">
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            <Dialog.Description className="contact-dialog__description">
              Send me a message and I’ll get back to you as soon as possible.
            </Dialog.Description>

            <form className="contact-dialog__form">
              <label className="contact-dialog__field">
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" />
              </label>

              <label className="contact-dialog__field">
                <span>Email</span>
                <input type="email" name="email" placeholder="you@example.com" />
              </label>

              <label className="contact-dialog__field">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="What would you like to talk about?"
                />
              </label>

              <div className="contact-dialog__actions">
                <Dialog.Close asChild>
                  <button type="button" className="contact-dialog__button--ghost">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="contact-dialog__button--primary"
                >
                  Send
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </nav>
  );
}
