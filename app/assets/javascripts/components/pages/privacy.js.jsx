var React        = require('react');
var mui          = require('material-ui');
var Paper        = mui.Paper;
var Menu         = require('../menu.js.jsx');
var MarvelTheme  = require('../../mixins/marvel-theme.js');

var PrivacyPage = React.createClass({

  mixins: [MarvelTheme],

  propTypes: {
    loggedIn:     React.PropTypes.bool.isRequired,
    leaderTeamId: React.PropTypes.number,
  },

  render: function() {
    return (
      <div>
        <Menu title="Leaderboard"
          loggedIn={this.props.loggedIn}
          leaderTeamId={this.props.leaderTeamId}
        />
        <div id="main">
          <Paper zIndex={1}>
            <div id="privacy_policy">
              <h1>Application Privacy Statement</h1>
              <img id="privacy_logo" src="/images/avengers-assemble-logo-medium.png" />
              <p>
                This privacy statement applies to the treatment of personally identifiable
                information submitted by, or otherwise obtained from, you in connection with
                the associated application ("Assemble Avengers"). The Application is provided
                by Norman Development (and may be provided by Norman Development on behalf of
                a Norman Development licensor or partner. By using or otherwise accessing the
                Application, you acknowledge that you accept the practices and policies
                outlined in this Privacy Statement.
              </p>

              <h3>WHAT PERSONAL INFORMATION DOES Norman Development COLLECT?</h3>

              <p>
                We collect the following types of information from our users:
              </p>

              <p>
                <strong>Personal Information You Provide to Us:</strong>
                <br />
                We may receive and store any information you submit to the Application
                (or otherwise authorize us to obtain – such as, from (for example) your
                Facebook account). The types of personal information collected may include
                your full name, email address, gender, IP address, browser information,
                username, demographic information, and any other information necessary for us
                to provide the Application services.
              </p>

              <p>
                <strong>Personal Information Collected Automatically:</strong>
                <br />
                We receive and store certain types of usage related information whenever you
                interact with Application. For example, Norman Development may automatically
                receive and record information regarding your computer’s IP address, browser
                information, Facebook user ID, Facebook Page fan status, and URLs accessed.
                Such information may be shared in aggregate (non-personally identifiable)
                form with our partners.
              </p>

              <p>
                <strong>HOW DOES Norman Development USE THE INFORMATION IT COLLECTS?</strong>
                <br />
                Norman Development uses the information described in this Privacy Statement
                (i) internally, to analyze, develop and improve its products and services,
                and (ii) as set forth below in the “Will Norman Development Share any of the
                personal information it Collects” section below.
              </p>

              <h3>APPLICATION PARTNER TREATMENT OF PERSONAL INFORMATION.</h3>

              <p>
                Norman Development may provide personal information to the applicable
                Application Partner. The Application Partner’s use of your personal information
                is subject to the Application Partner’s separate privacy policy – and not this
                Privacy Statement. The Application Partner’s privacy policy is linked to from
                within the Partner’s Facebook application.
              </p>

              <p>
                <strong>
                  WILL Norman Development SHARE ANY OF THE PERSONAL INFORMATION IT RECEIVES?
                </strong>
                <br />
                Personal information about our users is an integral part of our business.
                We neither rent nor sell your personal information to anyone (with the
                exception of sharing your information with an applicable Application Partner –
                see the “Application Partner Treatment” section above). We share your personal
                information only as described below.
              </p>

              <p>
                Application Partners: We will share your personal information with an applicable
                Application Partner (see the “Application Partner Treatment” section above).
              </p>

              <p>
                Agents: We employ other companies and people to perform tasks on our behalf and
                need to share your information with them to provide products or services to you.
                Unless we tell you differently, Norman Development’s agents do not have any
                right to use personal information we share with them beyond what is necessary to
                assist us. You hereby consent to our sharing of personal information for the
                above purposes. Business Transfers: In some cases, we may choose to buy or sell
                assets. In these types of transactions, customer information is typically one of
                the business assets that are transferred. Moreover, if Norman Development, or
                substantially all of its assets were acquired, or in the unlikely event that
                Norman Development goes out of business or enters bankruptcy, user information
                would be one of the assets that is transferred or acquired by a third party. You
                acknowledge that such transfers may occur, and that any acquirer of
                Norman Development may continue to use your personal information as set forth
                in this policy.
              </p>

              <p>
                Protection of Norman Development and Others: We may release personal information
                when we believe in good faith that release is necessary to comply with the law;
                enforce or apply our conditions of use and other agreements; or protect the
                rights, property, or safety of Norman Development, our employees, our users, or
                others. This includes exchanging information with other companies and
                organizations for fraud protection and credit risk reduction.
              </p>

              <p>
                With Your Consent: Except as set forth above, you will be notified when your
                personal information may be shared with third parties, and will be able to
                prevent the sharing of this information.
              </p>

              <h3>CONDITIONS OF USE.</h3>

              <p>
                If you decide to use or otherwise access the Application, your use/access and
                any possible dispute over privacy is subject to this Privacy Statement and our
                Terms of Use, including limitations on damages, arbitration of disputes, and
                application of California state law.
              </p>

              <h3>THIRD PARTY APPLICATIONS/WEBSITES.</h3>

              <p>
                The Application may permit you to link to other applications or websites. Such
                third party applications/websites are not under Norman Development’s control,
                and such links do not constitute an endorsement by Norman Development of those
                other applications/websites or the services offered through them. The privacy
                and security practices of such third party application/websites linked to the
                Application are not covered by this Privacy Statement, and Norman Development is
                not responsible for the privacy or security practices or the content of
                such websites.
              </p>

              <h3>WHAT PERSONAL INFORMATION CAN I ACCESS?</h3>

              <p>
                Norman Development allows you to access the following information about you for
                the purpose of viewing, and in certain situations, updating that information.
                This list may change in the event the Application changes.
              </p>

              <ul>
                <li>Account and user profile information</li>
                <li>User e-mail address, if applicable</li>
                <li>Facebook profile information, if applicable</li>
                <li>User preferences</li>
                <li>Application specific data</li>
              </ul>

              <h3>CAN CHILDREN USE THE APPLICATION?</h3>

              <p>
                Our site and the services available through Norman Development are not intended
                for children under the age of 13. Norman Development does not knowingly or
                specifically collect information about children under the age of 13 and believes
                that children of any age should get their parents’ consent before giving out any
                personal information. We encourage you to participate in your child’s
                web experience.
              </p>

              <h3>CHANGES TO THIS PRIVACY STATEMENT.</h3>

              <p>
                Norman Development may amend this Privacy Statement from time to time. Use of
                information we collect now is subject to the Privacy Statement in effect at the
                time such information is used. If we make changes in the way we use personal
                information, we will notify you by posting an announcement on our Site or
                sending you an email. Users are bound by any changes to the Privacy Statement
                when he or she uses or otherwise accesses the Application after such changes
                have been first posted.
              </p>

              <h3>QUESTIONS OR CONCERNS.</h3>

              <p>
                If you have any questions or concerns regarding privacy on our Website, please
                send us a detailed message at&nbsp;
                <a href="mailto:rsnorman+assembleavengers@gmail.com">
                  rsnorman+assembleavengers@gmail.com
                </a>. We will make every effort to resolve your concerns.
              </p>

              <p>
                <em>Effective Date: November 2nd, 2015</em>
              </p>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
});

module.exports = PrivacyPage;
