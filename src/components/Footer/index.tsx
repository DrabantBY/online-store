import { AiFillGithub } from 'react-icons/ai';
import './footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <a href="https://rs.school/js/">
          <img className="footer-logo-rss" src="https://rs.school/images/rs_school_js.svg" alt="logo" />
        </a>
        <span className="footer-text">Online Store 2023</span>
        <a href="https://github.com/DrabantBY/online-store">
          <AiFillGithub fontSize="2.5em" />
        </a>
      </div>
    </div>
  );
};
