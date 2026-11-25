import { Layout } from 'src/layouts/common/styles';

import * as SC from './styles.ts';

export function AboutPage() {
  return (
    <Layout as="main">
      <SC.Container>
        <SC.Title>About</SC.Title>

        <SC.Section>
          <SC.H3>Feedback</SC.H3>
          <SC.P>
            Feedback and suggestions are welcome, please file an issue in the Github repo.
          </SC.P>
        </SC.Section>

        <SC.Section>
          <SC.H3>Github</SC.H3>
          <SC.P>
            {/*<SC.Link href="#">[GITHUB REPO LINK]</SC.Link>*/}
            TBA
          </SC.P>
        </SC.Section>

        <SC.Section>
          <SC.H3>FAQ</SC.H3>
          <SC.FAQ>
            <SC.FAQQuestion>
              Why is the Filecoin.tools ID in the upper left corner different from the Deal ID?
            </SC.FAQQuestion>
            <SC.FAQAnswer>
              The Filecoin.tools ID is a unique, offchain identifier assigned to the deal so that
              Filecoin.tools has a way to key all deals uniquely over time. Deal IDs from expired
              deals may get recycled by the chain and some types of storage deals (e.g. from the new
              DDO programmable storage markets) may not have unique on-chain deal identifiers.
            </SC.FAQAnswer>
          </SC.FAQ>
          <SC.FAQ>
            <SC.FAQQuestion>What are the data sources of Filecoin.tools?</SC.FAQQuestion>
            <SC.FAQAnswer>
              StateMarketDeals.json (f05) - Originally, Filecoin.tools only showed data from the
              StateMarketDeals.json produced by the Lotus RPC API, which reflects data from the
              original Filecoin Storage Market Actor (f05). (StateMarketDeals.json data is currently
              served by <SC.Link href="https://api.node.glif.io/">Glif Nodes</SC.Link> as a
              compressed file). This data is still included and updated once every day.
              <br />
              <br />
              Datacapstats.io Deals - However Filecoin.tools now also pulls data from the
              Datacapstats.io Fil+ dashboard, which includes data Fil+ DataCap claim events. This
              aggregates data on verified Fil+ storage deals, whether via the original f05 actor or
              new DDO storage markets. Claim events data is updated every 5-10 minutes.
              <br />
              <br />
              Unverified DDO Deals - Additionally, Filecoin.tools can include data on unverified
              (non-Fil+) storage deals and its smart contract events via DDO. If you’d like to share
              information about a new DDO storage market to add to Filecoin.tools please file an
              issue in the Github repo above.
            </SC.FAQAnswer>
          </SC.FAQ>
          <SC.FAQ>
            <SC.FAQQuestion>
              Why is the “Total unique providers” number on the homepage different from the number
              of “Active Storage Providers” on Filecoin block explorers?
            </SC.FAQQuestion>
            <SC.FAQAnswer>
              Filecoin.tools also displays some information on inactive deals that may have expired
              or been cancelled. Sometimes deal proposals do not get activated, some get slashed,
              some deals include sectors that have not yet been sealed and are not considered
              active.
            </SC.FAQAnswer>
          </SC.FAQ>
        </SC.Section>
      </SC.Container>
    </Layout>
  );
}
