# Yoruba recording list (Zolo screen reader)

Source of truth: `frontend/messages/yo.json`. Each row is one clip. The ID is the key in that file.

- **EXISTS** = Yoruba text is already in `yo.json` (natively reviewed per README).
- **DRAFT** = missing from `yo.json`; the Yoruba below is my draft and **needs a native speaker to check** before you record.
- Text with `{...}` is dynamic (name, amount, digits, time). Record the fixed parts as separate clips and the
  variable parts from section 14, so they can be joined.

---

## 1. Everywhere (every screen)

| ID | Yoruba | Status |
|---|---|---|
| app.name | Zolo | DRAFT |
| app.forBank | fún Zenith Bank | DRAFT |
| app.skip | Fo lọ sí àkóónú pàtàkì | EXISTS |
| common.back | Padà | EXISTS |
| common.done | Ó ti parí | EXISTS |
| common.tryAgain | Gbìyànjú lẹ́ẹ̀kan sí i | EXISTS |
| common.verified | Báńkì ti ṣàyẹ̀wò rẹ̀ | EXISTS |
| common.timeLeft | Àkókò tó ṣẹ́kù | EXISTS |
| common.oneMinute | Ìṣẹ́jú kan ló kù. | EXISTS |
| common.fifteenSeconds | Ìṣẹ́jú-àáyá mẹ́ẹ̀dógún ló kù. | EXISTS |
| common.timeUp | Àkókò ti parí. | EXISTS |
| common.offline | Kò sí ìkànnì. À ń gbìyànjú lẹ́ẹ̀kan sí i. | EXISTS |
| language.label | Èdè | EXISTS |
| language.hint | Èyí yí èdè àwọn ojú ìkànnì padà. Èdè Gẹ̀ẹ́sì tàbí Pidgin nìkan ni a fi ń sọ ìbéèrè náà ní báyìí. | EXISTS (update: say Yoruba once readback exists) |
| role.customer | Oníbàárà | EXISTS |
| role.agent | Aṣojú | EXISTS |
| errors.network | Kò sí ìkànnì. A kò fi nǹkan kankan ránṣẹ́. Gbìyànjú lẹ́ẹ̀kan sí i. | EXISTS |
| errors.generic | Nǹkan kan ṣẹlẹ̀. A kò fi nǹkan kankan ránṣẹ́. Gbìyànjú lẹ́ẹ̀kan sí i. | EXISTS |
| errors.rateLimited | O ti gbìyànjú ní ìgbà púpọ̀. Dúró fún ìṣẹ́jú kan, kí o tún gbìyànjú. | EXISTS |
| errors.notFound | A kò rí ìbéèrè náà. | EXISTS |

## 2. Landing page (`/`)

| ID | Yoruba | Status |
|---|---|---|
| landing.navLabel | Zolo | DRAFT |
| landing.tryDemo | Gbìyànjú àpẹẹrẹ | DRAFT |
| landing.tryDemoOpens | Gbìyànjú àpẹẹrẹ, ó ṣí ojú ìwọlé àpẹẹrẹ | DRAFT |
| landing.watchDemo | Wo àpẹẹrẹ ìṣẹ́jú-àáyá àádọ́rùn-ún | DRAFT |
| landing.newTab | ó ṣí ní táàbù tuntun | DRAFT |
| landing.hero.title | Ẹnikẹ́ni lè dábàá ìsanwó. Ìwọ nìkan ni o lè fọwọ́ sí i. | DRAFT |
| landing.hero.lede | Zolo jẹ́ kí àwọn oníbàárà afọ́jú àti àwọn tí ojú wọn kò ríran dáadáa sanwó lọ́dọ̀ aṣojú tàbí POS, nípa gbígbọ́ ìbéèrè náà kọ́kọ́, lẹ́yìn náà kí wọ́n fọwọ́ sí i pẹ̀lú passkey tiwọn. | DRAFT |
| landing.hero.note | A ṣe é fún àwọn oníbàárà Zenith Bank. | DRAFT |
| landing.hero image alt | Ẹnìkan di fóònù aláwọ̀ pishi mọ́ etí rẹ̀, a rí i ní ẹ̀gbẹ́. | DRAFT |
| landing.problem.title | Ní ibi tí èrò ti pọ̀, o kò lè rí ojú ìkànnì. | DRAFT |
| landing.problem.p1 | Aṣojú sọ iye owó fún ọ. Ẹ̀rọ náà dún. Ẹnìkan wà lẹ́yìn rẹ tí ó ń dúró. | DRAFT |
| landing.problem.p2 | Ohunkóhun tí wọ́n bá sọ fún ọ, o gbọ́dọ̀ gbà á gbọ́. Ó pọ̀ jù láti béèrè nígbà tí owó rẹ ni. | DRAFT |
| landing.rule.title | A kò ní fi nǹkan ránṣẹ́ títí o fi gbọ́ ọ tí o sì fọwọ́ sí i. | DRAFT |
| landing.rule.p | Zolo ka ìsanwó náà sókè: ta ló ń béèrè, àti iye tí ó jẹ́. Lẹ́yìn náà nìkan ni o tó lè fọwọ́ sí i, pẹ̀lú ìka ọwọ́, ojú tàbí ìdè ẹ̀rọ rẹ. | DRAFT |
| landing.how.title | Bí ó ṣe ń ṣiṣẹ́ | DRAFT |
| landing.how.intro | Ìgbésẹ̀ mẹ́ta. Àwọn ojú ìkànnì wọ̀nyí wá láti inú àpù fúnra rẹ̀. | DRAFT |
| landing.how.s1.title | Aṣojú ń béèrè. | DRAFT |
| landing.how.s1.p | Ó tẹ iye owó, ó sì ka kóòdù oní-nọ́ńbà mẹ́rin fún ọ. | DRAFT |
| landing.how.s1.alt | Ojú ìkànnì aṣojú: iye owó, ẹgbẹ̀rún mẹ́ẹ̀dógún naira, kóòdù oní-nọ́ńbà mẹ́rin ńlá àti kóòdù QR, pẹ̀lú ìránnilétí láti fún owó nìkan lẹ́yìn tí o bá rí A ti san án. | DRAFT |
| landing.how.s2.title | O gbọ́ ọ. | DRAFT |
| landing.how.s2.p | Zolo sọ ta ló ń béèrè àti iye tí ó jẹ́. Iye náà tún wà lójú ìkànnì, ní lẹ́tà ńlá gan-an. | DRAFT |
| landing.how.s2.alt | Ojú ìkànnì oníbàárà: Bisi Ventures ń béèrè fún ẹgbẹ̀rún mẹ́ẹ̀dógún naira, ní lẹ́tà ńlá gan-an, pẹ̀lú bọ́tìnì Fọwọ́ sí pupa àti bọ́tìnì Kọ̀ ní ìsàlẹ̀. | DRAFT |
| landing.how.s3.title | O fọwọ́ sí i, a sì ti san án. | DRAFT |
| landing.how.s3.p | O lo ìka ọwọ́, ojú tàbí ìdè ẹ̀rọ rẹ. Aṣojú rí A ti san án, ó sì fún ọ ní owó. | DRAFT |
| landing.how.s3.alt | Ojú ìkànnì A ti san án ti oníbàárà: àmì àyẹ̀wò aláwọ̀ ewé, ọ̀rọ̀ A ti san án, iye ẹgbẹ̀rún mẹ́ẹ̀dógún naira àti ọ̀rọ̀ sí Bisi Ventures. | DRAFT |
| landing.why.title | Ìsanwó kò yẹ kí ó dá lórí ẹni tí o gbẹ́kẹ̀lé ní ibi ìsanwó. | DRAFT |
| landing.why.p1 | Àwọn afọ́jú àti àwọn tí ojú wọn kò ríran dáadáa ń lo owó lójoojúmọ́, ní ọjà, lọ́dọ̀ aṣojú, ní ṣọ́ọ̀bù. | DRAFT |
| landing.why.p2 | Wọn kò yẹ kí wọ́n fi ìgbẹ́kẹ̀lé lé wọn lọ́wọ́ pẹ̀lú owó. Zolo jẹ́ àtúnṣe kékeré tí ó dá ìpinnu padà sọ́dọ̀ ẹni tí ó ń sanwó. | DRAFT |
| landing.safe.title | Ohun tí ó mú kí ó wà ní ààbò | DRAFT |
| landing.safe.intro | Àwọn ohun tí ẹ̀rọ náà ń ṣe gan-an nìkan. | DRAFT |
| landing.safe.i1 | Báńkì ń ṣàyẹ̀wò orúkọ ẹni tí o ń sanwó fún. | DRAFT |
| landing.safe.i2 | O ń fọwọ́ sí i pẹ̀lú passkey rẹ: ìka ọwọ́, ojú tàbí ìdè ẹ̀rọ rẹ. | DRAFT |
| landing.safe.i3 | Ohùn nìkan kò lè fọwọ́ sí ìsanwó láé. | DRAFT |
| landing.safe.i4 | Ìbéèrè kan máa parí lẹ́yìn ìṣẹ́jú méjì. | DRAFT |
| landing.safe.i5 | A kò ní fi nǹkan ránṣẹ́ àfi tí o bá fọwọ́ sí i. | DRAFT |
| landing.cta.title | Wò ó fúnra rẹ. | DRAFT |
| landing.cta.p | Ṣí àpẹẹrẹ, jẹ́ aṣojú, lẹ́yìn náà jẹ́ oníbàárà. | DRAFT |
| landing.cta.repo | Wo kóòdù lórí GitHub | DRAFT |
| landing.footer.event | Zecathon 6.0, Track 7 | DRAFT |
| landing.footer.credits | Ìdúpẹ́ fún àwọn àwòrán | DRAFT |
| landing.footer.madeBy | {team} ló ṣe é | DRAFT |
| landing.alt.counter | Ọwọ́ ń ka àkójọ owó naira lẹ́gbẹ̀ẹ́ ẹ̀rọ ìsanwó káàdì, lórí tábìlì ní ìta. | DRAFT |
| landing.alt.hands | Obìnrin kan tí ó wọ dígí ojú oòrùn àti ẹ̀rọ ìgbọ́ràn ń tẹ̀ kọ̀ǹpútà, ó jókòó ní tábìlì. | DRAFT |
| landing.alt.street | Ènìyàn mẹ́rin ń rìn lójú ọ̀nà, méjì nínú wọn ń lo ọ̀pá funfun. | DRAFT |

## 3. Sign in (`/signin`)

| ID | Yoruba | Status |
|---|---|---|
| signin.title | Yan ẹni tí ìwọ jẹ́ | EXISTS |
| signin.intro | Àpẹẹrẹ ni èyí. Yan ẹni tí o fẹ́ jẹ́. | EXISTS |
| signin.customer | Oníbàárà ni mí: {name} | EXISTS |
| signin.agent | Aṣojú ni mí: {name} | EXISTS |
| signin.failed | A kò lè wọlé. Gbìyànjú lẹ́ẹ̀kan sí i. | EXISTS |

## 4. Customer home (`/home`)

| ID | Yoruba | Status |
|---|---|---|
| home.title | Kí ni o fẹ́ ṣe? | EXISTS |
| home.payAgent | Sanwó fún aṣojú | EXISTS |
| home.payAgentHint | Tẹ kóòdù oní-nọ́ńbà mẹ́rin tí aṣojú fún ọ | EXISTS |
| home.recent | Àwọn ìsanwó àìpẹ́ yìí | EXISTS |
| home.recentEmpty | Kò tíì sí ìsanwó kankan. | EXISTS |
| home.recentEmptyHint | Àwọn ìsanwó tí o bá fọwọ́ sí yóò hàn níbí. | EXISTS |
| home.today / yesterday | lónìí / àná | EXISTS |
| home.itemPaid | O san {amountWords} fún {payee}, {when} | EXISTS |
| home.itemDeclined | O kọ̀ {amountWords} fún {payee}, {when} | EXISTS |
| home.itemNotPaid | A kò san: {amountWords} fún {payee}, {when} | EXISTS |

## 5. Passkey setup (`/setup/passkey`) and the "set up first" prompt

| ID | Yoruba | Status |
|---|---|---|
| passkey.title | Ṣètò passkey rẹ | EXISTS |
| passkey.what | Passkey jẹ́ kí o lè fọwọ́ sí ìsanwó pẹ̀lú ìka ọwọ́, ojú tàbí ìdè ẹ̀rọ rẹ. | EXISTS |
| passkey.never | Zolo kì í béèrè PIN rẹ tàbí nọ́ńbà káàdì rẹ láé. | EXISTS |
| passkey.private | Ṣètò ìdè ẹ̀rọ rẹ níbi tí ẹnikẹ́ni kò ti rí ọ. Lo ẹ̀rọ ìgbọ́ràn tí o bá lè. | EXISTS |
| passkey.start / needAction | Ṣètò passkey | EXISTS |
| passkey.working | À ń dúró de fóònù rẹ | EXISTS |
| passkey.done | Passkey rẹ ti ṣetán. | EXISTS |
| passkey.doneReplaced | Passkey rẹ ti ṣetán. Ó ti rọ́pò èyí àtijọ́. | EXISTS |
| passkey.cancelled | O fagilé e. O lè tún gbìyànjú. | EXISTS |
| passkey.already | Fóònù yìí ti ní passkey rẹ. | EXISTS |
| passkey.unsupported | Ẹ̀rọ aṣàwákiri yìí kò lè lo passkey. Ṣí Zolo nínú Chrome tàbí Safari. | EXISTS |
| passkey.noLock | Fóònù yìí kò ní ìdè ẹ̀rọ tí a lè lò. Tan ìka ọwọ́, ojú tàbí ìdè ẹ̀rọ nínú ètò fóònù rẹ, lẹ́yìn náà padà wá. | EXISTS |
| passkey.failed | A kò lè ṣètò passkey rẹ. Gbìyànjú lẹ́ẹ̀kan sí i. | EXISTS |
| passkey.rowTitle | Passkey | EXISTS |
| passkey.statusOn | A ti ṣètò rẹ̀ lórí fóònù yìí | EXISTS |
| passkey.statusOff | A kò tíì ṣètò rẹ̀ | EXISTS |
| passkey.actionOff | Ṣètò | EXISTS |
| passkey.needTitle | Ṣètò passkey rẹ kọ́kọ́ | EXISTS |
| passkey.needBody | O ń fọwọ́ sí ìsanwó pẹ̀lú ìka ọwọ́, ojú tàbí ìdè ẹ̀rọ rẹ. Ó máa gba ìṣẹ́jú-àáyá díẹ̀, lẹ́yìn náà o máa padà síbí lẹ́sẹ̀kẹsẹ̀. | EXISTS |

## 6. Enter the agent's code (`/pay/code`)

| ID | Yoruba | Status |
|---|---|---|
| pay.title | Sanwó fún aṣojú | EXISTS |
| pay.label | Kóòdù oní-nọ́ńbà mẹ́rin ti aṣojú | EXISTS |
| pay.hint | Bi aṣojú láti kà àwọn nọ́ńbà mẹ́rin tó wà lórí ìkànnì rẹ̀ fún ọ. | EXISTS |
| pay.checking | À ń ṣàyẹ̀wò kóòdù náà | EXISTS |
| pay.notFound | Kò sí ìbéèrè tó ní kóòdù yìí. Ṣàyẹ̀wò nọ́ńbà mẹ́rin náà pẹ̀lú aṣojú. | EXISTS |
| pay.expired | Kóòdù yìí ti parí. Bi aṣojú fún tuntun. | EXISTS |
| pay.invalid | Tẹ nọ́ńbà mẹ́rin. | EXISTS |
| pay.back | Padà sílé | EXISTS |

## 7. Review and approve (`/requests/[id]`)

| ID | Yoruba | Status |
|---|---|---|
| review.title | {payee} ń béèrè fún {amount} | EXISTS |
| review.askingFor | ń béèrè fún | EXISTS |
| review.bank | Ìsanwó sí àkọọ́lẹ̀ Zenith Bank | EXISTS |
| review.readbackHeading | Ohun tí Zolo sọ | EXISTS |
| review.loading | À ń mú ìbéèrè náà wá | EXISTS |
| review.playFirst | Gbọ́ ìbéèrè náà | EXISTS |
| review.hearAgain | Gbọ́ lẹ́ẹ̀kan sí i | EXISTS |
| review.audioBlocked | Tẹ̀ láti gbọ́ ìbéèrè náà. | EXISTS |
| review.approve | Fọwọ́ sí {amount} | EXISTS |
| review.approveSpoken | Fọwọ́ sí {amountWords} fún {payee} | EXISTS |
| review.approveBusy | À ń ṣàyẹ̀wò pé ìwọ ni | EXISTS |
| review.approveWait | Kọ́kọ́ gbọ́ ìbéèrè náà. | EXISTS |
| review.decline | Kọ̀ | EXISTS |
| review.modeZolo | Lo ohùn Zolo | EXISTS |
| review.modeReader | Lo ẹ̀rọ kíkà ìkànnì mi nìkan | EXISTS |
| review.modeZoloNow | Ohùn Zolo wà ní títàn. | EXISTS |
| review.modeReaderNow | Ẹ̀rọ kíkà ìkànnì nìkan. Zolo kò ní sọ̀rọ̀. | EXISTS |
| review.englishNote | Èdè Gẹ̀ẹ́sì ni a fi ń sọ ìbéèrè náà fún ọ ní báyìí. | EXISTS |
| review.askPasskey | Lo ìka ọwọ́, ojú tàbí ìdè ẹ̀rọ rẹ. | EXISTS |
| review.declined | O kọ̀. A kò fi nǹkan kankan ránṣẹ́. | EXISTS |
| review.cancelled | O fagilé e. A kò fi nǹkan kankan ránṣẹ́. O lè tún gbìyànjú. | EXISTS |
| review.notYou | A kò lè jẹ́rìí pé ìwọ ni. A kò fi nǹkan kankan ránṣẹ́. Gbìyànjú lẹ́ẹ̀kan sí i. | EXISTS |
| review.noPasskey | O nílò passkey kọ́kọ́. | EXISTS |
| review.unavailable | Ìbéèrè yìí kò sí mọ́. | EXISTS |

## 8. Result screen (`/requests/[id]/result`)

| ID | Yoruba | Status |
|---|---|---|
| result.paid / paidAnnounce | A ti san án. O fi {amount} ránṣẹ́ sí {payee}. | EXISTS |
| result.paidShort, badge.paid | A ti san án | EXISTS |
| result.paidFrom | sí {payee} | EXISTS |
| result.paidBody | Owó náà ti kúrò nínú àkọọ́lẹ̀ rẹ. | EXISTS |
| result.declined | O kọ̀. A kò fi nǹkan kankan ránṣẹ́. | EXISTS |
| result.declinedBody | O sọ pé rárá, nítorí náà owó kò lọ. | EXISTS |
| result.expired | Ìbéèrè yìí ti parí. A kò fi nǹkan kankan ránṣẹ́. | EXISTS |
| result.expiredBody | Bi aṣojú fún kóòdù tuntun. | EXISTS |
| result.changed | Ìsanwó yìí yípadà lẹ́yìn tí o gbọ́ ọ. A kò fi nǹkan kankan ránṣẹ́. | EXISTS |
| result.changedBody | Má ṣe san án. Sọ fún aṣojú kí ó bẹ̀rẹ̀ lẹ́ẹ̀kan sí i. | EXISTS |
| result.failed | Ìsanwó náà kò lọ. A kò fi nǹkan kankan ránṣẹ́. | EXISTS |
| result.failedBody | Owó rẹ wà ní ààbò. O lè tún gbìyànjú. | EXISTS |
| result.limit | Èyí ti kọjá ààlà rẹ. A kò fi nǹkan kankan ránṣẹ́. | EXISTS |
| result.limitBody | Béèrè fún iye tó kéré jù. | EXISTS |
| result.blocked | A dá ìsanwó yìí dúró láti dáàbò bo owó rẹ. A kò fi nǹkan kankan ránṣẹ́. | EXISTS |
| result.blockedBody | Bá báńkì sọ̀rọ̀ tí o bá rò pé àṣìṣe wà. | EXISTS |
| result.rejected | Báńkì kò gba ìsanwó yìí. A kò fi nǹkan kankan ránṣẹ́. | EXISTS |
| result.rejectedBody | Owó rẹ wà ní ààbò. | EXISTS |
| result.processing | À ń ṣe é lọ́wọ́. Má ṣe fún ẹnikẹ́ni ní ẹrù rẹ̀ sibẹ̀. | EXISTS |
| result.processingBody | O fọwọ́ sí {amount} fún {payee}. À ń dúró kí báńkì jẹ́rìí rẹ̀. Ojú ìkànnì yìí yóò ṣe ara rẹ̀ ní àtúnṣe. | EXISTS |
| result.checking | À ń ṣàyẹ̀wò ohun tó ṣẹlẹ̀. Jọ̀wọ́ dúró. | EXISTS |
| result.details | Ìtọ́kasí {reference} | EXISTS |
| badge: processing / declined / expired / changed / failed+limit / blocked / rejected | À ń ṣe é / A kọ̀ ọ́ / Ó ti parí / Ó yípadà / A kò fi ránṣẹ́ / A dá a dúró / Báńkì kò gbà á | EXISTS |

## 9. Agent: new request and waiting (`/agent`)

| ID | Yoruba | Status |
|---|---|---|
| agent.title | Ìbéèrè tuntun | EXISTS |
| agent.business | Àwọn oníbàárà yóò gbọ́: {name} | EXISTS |
| agent.amountLabel | Iye owó | EXISTS |
| agent.amountNow | Iye owó: {amountWords} | EXISTS |
| agent.keypad | Bọ́tìnì iye owó | EXISTS |
| agent.clear | Pa á rẹ́ | EXISTS |
| agent.backspace | Pa nọ́ńbà tó gbẹ̀yìn rẹ́ | EXISTS |
| agent.chip | Ṣètò iye sí {amountWords} | EXISTS |
| agent.request | Béèrè fún {amount} | EXISTS |
| agent.requestSpoken | Béèrè fún {amountWords} | EXISTS |
| agent.requestEmpty | Béèrè | EXISTS |
| agent.requestNeedsAmount | Kọ́kọ́ tẹ iye owó. | EXISTS |
| agent.requesting | À ń fi ìbéèrè náà ránṣẹ́ | EXISTS |
| agent.failed | Ìsanwó náà kò lọ. Owó kò kúrò. | EXISTS |
| agent.waitingTitle | À ń dúró de oníbàárà | EXISTS |
| agent.yourCode | Kóòdù rẹ | EXISTS |
| agent.codeAloud | Ka kóòdù yìí sókè fún oníbàárà. | EXISTS |
| agent.codeSpoken | Kóòdù: {digits} | EXISTS |
| agent.qrHidden | Kóòdù QR fún kámẹ́rà oníbàárà wà níbí. | EXISTS |
| agent.waitForPaid | Fún owó nìkan lẹ́yìn tí o bá rí A ti san án. | EXISTS |
| agent.stateWaiting | À ń dúró kí oníbàárà ṣí i. | EXISTS |
| agent.stateReviewing | Oníbàárà ń gbọ́ ìbéèrè náà. | EXISTS |
| agent.paid, paidAnnounce, paidBody, paidAt | A ti san án / A ti san án. {amountWords} láti ọ̀dọ̀ oníbàárà. O lè fún un ní owó. / A gba {amount} ní {time}. / A gbà á ní {time} | EXISTS |
| agent.processing, processingBody | À ń ṣe é lọ́wọ́. Má ṣe fún ẹnikẹ́ni ní ẹrù rẹ̀ sibẹ̀. / Oníbàárà ti fọwọ́ sí i. Báńkì kò tíì jẹ́rìí rẹ̀. Dúró de A ti san án. | EXISTS |
| agent.declined | Oníbàárà sọ pé rárá. Owó kò kúrò. | EXISTS |
| agent.expired | Ìbéèrè yìí ti parí. Owó kò kúrò. | EXISTS |
| agent.noCode | Kóòdù náà kò sí lórí ojú ìkànnì yìí mọ́. Ṣe ìbéèrè tuntun. | EXISTS |
| agent.newRequest | Ìbéèrè tuntun | EXISTS |
| agent.badge.failed | A kò san án | EXISTS |

## 10. Phone-call approval: setup (`/setup/phone`) and call (`/requests/[id]/call`)

The whole `phone` section is missing from `yo.json`. The app has `langYo` for call prompts, so check where
the call prompts themselves live (they are recorded prompts, not in this file).

| ID | Yoruba | Status |
|---|---|---|
| phone.offer | Fọwọ́ sí i nípasẹ̀ ìpè fóònù dípò | DRAFT |
| phone.offerSetup | Ṣètò ìfọwọ́sí nípasẹ̀ fóònù | DRAFT |
| phone.offerNote | Ìpè kan yóò ka ìsanwó náà fún ọ, o sì fọwọ́ sí i pẹ̀lú PIN Zolo rẹ. Fún ìsanwó títí dé ₦20,000. | DRAFT |
| phone.setupTitle | Fọwọ́ sí i nípasẹ̀ ìpè fóònù | DRAFT |
| phone.setupWhat | Zolo yóò pè ọ́, yóò ka ìsanwó náà sókè, o sì fọwọ́ sí i pẹ̀lú PIN Zolo oní-nọ́ńbà mẹ́rin lórí bọ́tìnì. | DRAFT |
| phone.setupPin | Èyí jẹ́ PIN tuntun fún àwọn ìpè Zolo nìkan. Kì í ṣe PIN báńkì rẹ tàbí PIN káàdì rẹ láé. | DRAFT |
| phone.setupLimit | Ìfọwọ́sí fóònù wà fún ìsanwó títí dé ₦20,000. Àwọn tó pọ̀ jù nílò passkey rẹ. | DRAFT |
| phone.numberLabel | Nọ́ńbà tí Zolo yóò pè | DRAFT |
| phone.numberHint | Pẹ̀lú kóòdù orílẹ̀-èdè, bíi +2348012345678 | DRAFT |
| phone.pinLabel | Yan PIN Zolo oní-nọ́ńbà mẹ́rin | DRAFT |
| phone.pinHint | Kì í ṣe 1234, kì í ṣe nọ́ńbà tó jọra, kì í sì ṣe òpin nọ́ńbà rẹ | DRAFT |
| phone.languageLabel | Èdè ìpè náà | DRAFT |
| phone.langEn / langPcm / langYo | Gẹ̀ẹ́sì / Pidgin / Yorùbá | DRAFT |
| phone.save | Fi ìfọwọ́sí fóònù pamọ́ | DRAFT |
| phone.saving | À ń fipamọ́ | DRAFT |
| phone.saved | Ìfọwọ́sí fóònù ti ṣetán. | DRAFT |
| phone.badNumber | Ṣàyẹ̀wò nọ́ńbà náà: ó bẹ̀rẹ̀ pẹ̀lú + àti kóòdù orílẹ̀-èdè. | DRAFT |
| phone.weakPin | Yan PIN tí ó le láti rí. | DRAFT |
| phone.numberTaken | Àkọọ́lẹ̀ mìíràn ti ń lo nọ́ńbà yẹn. | DRAFT |
| phone.callTitle | Ìpè fóònù | DRAFT |
| phone.demoNote | Nínú àpẹẹrẹ yìí, ìpè náà ń dún níbí nínú àpù, pẹ̀lú àwọn ohùn tí a ti gbà sílẹ̀. Olùpèsè nẹtiwọki fóònù lè gbé ìpè kan náà. | DRAFT |
| phone.ringing | Zolo ń pè ọ́ | DRAFT |
| phone.answer | Gbà á | DRAFT |
| phone.hangUp | Gbé e kọ́ | DRAFT |
| phone.approve | 1, Fọwọ́ sí i | DRAFT |
| phone.decline | 2, Kọ̀ | DRAFT |
| phone.repeat | 9, Gbọ́ ọ lẹ́ẹ̀kan sí i | DRAFT |
| phone.pinPrompt | Tẹ PIN Zolo oní-nọ́ńbà mẹ́rin rẹ | DRAFT |
| phone.pinSend | Fi PIN ránṣẹ́ | DRAFT |
| phone.listening | À ń gbọ́ | DRAFT |
| phone.approved | A ti fọwọ́ sí i. Ìsanwó náà wà lójú ọ̀nà. | DRAFT |
| phone.declined | A kọ̀ ọ́. A kò fi nǹkan kankan ránṣẹ́. | DRAFT |
| phone.ended | Ìpè náà ti parí. A kò fi nǹkan kankan ránṣẹ́. | DRAFT |
| phone.locked | Ìfọwọ́sí fóònù ti wà ní títì fún ìgbà díẹ̀. O ṣì lè lo passkey rẹ. | DRAFT |
| phone.paused | Ìfọwọ́sí fóònù ti dúró fún ọjọ́ kan lẹ́yìn ìyípadà nọ́ńbà. | DRAFT |
| phone.notReady | Kọ́kọ́ ṣètò ìfọwọ́sí fóònù. | DRAFT |
| phone.tooMany | Ìpè púpọ̀ jù. Gbìyànjú lẹ́yìn ìṣẹ́jú díẹ̀. | DRAFT |
| phone.failed | Ìpè náà kò ṣiṣẹ́. A kò fi nǹkan kankan ránṣẹ́. | DRAFT |
| phone.usePasskey | Lo passkey mi dípò | DRAFT |
| phone.transcript | Ohun tí ìpè náà sọ | DRAFT |

## 11. Demo menu (floating "Demo tools")

| ID | Yoruba | Status |
|---|---|---|
| demoMenu.open / title | Àwọn irinṣẹ́ àpẹẹrẹ | DRAFT |
| demoMenu.close | Ti àwọn irinṣẹ́ àpẹẹrẹ | DRAFT |
| demoMenu.switchUser | Yí olùlò àpẹẹrẹ padà | DRAFT |
| demoMenu.console | Pápá àpẹẹrẹ | DRAFT |

## 12. Demo console (`/demo`) — optional, stage/operator only

Skip unless blind users will use it. If you want it: demo.title Pápá àpẹẹrẹ; demo.token Àmì àpẹẹrẹ; demo.request
Nọ́ńbà ìbéèrè; demo.reset Tún àpẹẹrẹ ṣe; demo.tamper Yí iye owó padà lẹ́yìn kíkà; demo.replay Tún ìfọwọ́sí ṣe;
demo.expire Jẹ́ kí ó parí báyìí; demo.timeline Àtòjọ àkókò; demo.state Ipò; demo.noEvents Kò tíì sí nǹkankan.
All DRAFT.

## 13. Not in the message files (decide before recording)

- **Screen-reader chrome** for the new feature (none of this exists yet): "Ohun kan tó kàn" (next item),
  "Ohun tó ṣáájú" (previous item), "Bọ́tìnì" (button), "Àpótí ọ̀rọ̀" (text field), "Àkọlé" (heading),
  "Àwòrán" (image), "Ìsopọ̀" (link), "Tẹ lẹ́ẹ̀mejì láti yàn" (double tap to activate), "Ti ṣàyàn" (selected),
  "Ó ti pa" (off) / "Ó ti tan" (on). DRAFT.
- **Keypad keys** on `/agent` and the 4-digit code field: the digits themselves (see section 14).
- **Country flag / language names** in the language picker: Èdè Gẹ̀ẹ́sì, Pidgin, Yorùbá, Hausa, Igbo.
- Any aria-labels hard-coded in components (I have not yet scanned `components/` and `app/` for strings
  outside `messages/`). I will do that next if you want.

## 14. Dynamic parts (record once, reuse)

- **Digits 0–9** (for code, PIN and keypad): òdo/ṣòòrò, ọ̀kan, èjì, ẹ̀ta, ẹ̀rin, àrún, ẹ̀fà, èje, ẹ̀jọ, ẹ̀sán.
- **Amounts in words**: the app speaks e.g. "fifteen thousand naira". Check how `amountWords` is built; the
  Yoruba numerals (ẹgbẹ̀rún, ọgọ́rùn-ún, etc.) are a larger set. The shipped demo amounts are the priority.
- **Names** (Bisi Ventures, demo customers/agents): record each demo name once.
- **Time** ("received at 2:30") and **reference numbers**: decide whether to read them or skip.

---

Notes
- Accent marks matter for recording; the native reviewer should confirm every DRAFT line.
