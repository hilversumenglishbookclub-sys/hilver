import { StoryScene } from '../types/game';

export const STORY_SCENES: Record<string, StoryScene> = {
  // ----------------------------------------------------
  // SCENE 1: DAY 1 - 8:42 AM (The Morning Buzz)
  // ----------------------------------------------------
  scene_day1_morning: {
    id: 'scene_day1_morning',
    day: 'DAY 1',
    time: '8:42 AM',
    location: 'Your Bedroom, Lagos',
    chapterTitle: 'Episode 1: The Lagos Equation',
    narrativeText:
      'The morning sunlight cuts through your blinds. Lagos traffic is already honking in the distance. Before you can even stretch, your phone starts vibrating aggressively on the nightstand. You have 3 new messages from 3 different worlds.',
    dialogue: [
      {
        sender: 'Mum ❤️',
        role: 'mum',
        text: 'My child, good morning. When are you bringing somebody home to introduce to us? Your cousin Amanda is doing her introduction next month o.',
        time: '8:35 AM',
      },
      {
        sender: 'Tobi',
        role: 'tobi',
        text: 'You disappeared yesterday night o! You dey form hard to get abi? Make we link up today for lunch.',
        time: '8:39 AM',
      },
      {
        sender: 'Unknown Number',
        role: 'unknown',
        text: 'Hi. I got your number from Shalewa at the art showcase. Hope you don\'t mind me reaching out directly?',
        time: '8:41 AM',
        isUrgent: true,
      },
    ],
    choices: [
      {
        id: 'reply_unknown',
        text: 'REPLY UNKNOWN NUMBER',
        subtext: '"Who is this please? And why does Shalewa have your back?"',
        statDeltas: { love: 5, drama: 10, status: 5 },
        nextSceneId: 'scene_unknown_reveal',
        consequenceTitle: 'Curiosity Sparked',
        consequenceNarrative:
          'You text the mystery number back. In Lagos, an unknown contact is either a massive opportunity or the start of fresh wahala. Within 4 seconds, typing bubbles appear.',
        flagToSet: 'contacted_daniel_first',
      },
      {
        id: 'reply_mum',
        text: 'REPLY MUM',
        subtext: '"Mummy calm down! God\'s time is the best."',
        statDeltas: { love: -5, drama: -5, status: 5 },
        nextSceneId: 'scene_mum_lecture',
        consequenceTitle: 'Family Pressure Activated',
        consequenceNarrative:
          'You send a diplomatic voice note to your mother. But African mothers don\'t do diplomacy on marriage. She sends back an immediate audio essay.',
        flagToSet: 'mum_involved',
      },
      {
        id: 'reply_tobi',
        text: 'REPLY TOBI',
        subtext: '"Nobody is forming hard to get. Who is paying for the lunch?"',
        statDeltas: { love: 5, status: -5, drama: 5 },
        nextSceneId: 'scene_tobi_banter',
        consequenceTitle: 'Old Habits Die Hard',
        consequenceNarrative:
          'Tobi responds with 10 laughing emojis and promises to order grilled catfish and mocktails. But does Tobi really have a plan?',
        flagToSet: 'tobi_entertained',
      },
      {
        id: 'ignore_all',
        text: 'IGNORE EVERYBODY',
        subtext: 'Put phone on "Do Not Disturb" and drink iced water.',
        statDeltas: { status: 15, drama: -10, love: -10 },
        nextSceneId: 'scene_peace_morning',
        consequenceTitle: 'Unbothered Energy',
        consequenceNarrative:
          'You flip the phone screen-down. Soft life over unnecessary panic. But in Lagos, ignoring messages never stops the storm from brewing.',
        flagToSet: 'cold_approach',
      },
    ],
    bgStyle: 'morning',
    ambientMood: 'calm',
  },

  // ----------------------------------------------------
  // SCENE 2A: Unknown Number Reveal (Daniel emerges)
  // ----------------------------------------------------
  scene_unknown_reveal: {
    id: 'scene_unknown_reveal',
    day: 'DAY 1',
    time: '9:15 AM',
    location: 'Lounge / Kitchen',
    narrativeText:
      'The unknown contact responds instantly with pristine diction. The DP shows a tall, immaculately dressed man standing next to an off-white Mercedes G-Wagon in front of a private penthouse in Ikoyi.',
    dialogue: [
      {
        sender: 'Unknown Number',
        role: 'unknown',
        text: 'Forgive my manners. My name is Daniel. Tech founder and private equity consultant. Shalewa said you have impeccable taste. I\'d love to take you to RSVP Victoria Island for dinner tonight.',
        time: '9:12 AM',
      },
      {
        sender: 'Daniel (Ikoyi)',
        role: 'daniel',
        text: 'I can send an Uber Black to pick you up by 7:30 PM. Say yes?',
        time: '9:14 AM',
      },
    ],
    choices: [
      {
        id: 'accept_daniel_date',
        text: 'ACCEPT THE DATE WITH DANIEL',
        subtext: '"7:30 PM sounds perfect. I like punctual people."',
        statDeltas: { love: 10, status: 15, drama: 10 },
        nextSceneId: 'scene_friend_warning',
        consequenceTitle: 'High Roller Invitation',
        consequenceNarrative:
          'You accept. Daniel replies: "Reservation confirmed. Looking forward to your company." Your status is buzzing, but your friend Shalewa hasn\'t spoken yet.',
        flagToSet: 'date_with_daniel_confirmed',
      },
      {
        id: 'vet_daniel',
        text: 'VET HIM WITH SKEPTICISM',
        subtext: '"Hold on. Send your LinkedIn and Instagram first, Daniel."',
        statDeltas: { status: 10, drama: -5, love: -5 },
        nextSceneId: 'scene_daniel_vetted',
        consequenceTitle: 'Lagos Street Smarts',
        consequenceNarrative:
          'Daniel laughs: "Smart. I respect someone who checks references." He shares a verified handle with 45k followers, philanthropy photos, and zero relationship clues.',
        flagToSet: 'daniel_vetted',
      },
      {
        id: 'call_shalewa_now',
        text: 'CALL SHALEWA IMMEDIATELY',
        subtext: '"Shalewa, why are you distributing my contact to Ikoyi men?"',
        statDeltas: { drama: 15, status: 5 },
        nextSceneId: 'scene_friend_warning',
        consequenceTitle: 'BFF On The Hotline',
        consequenceNarrative:
          'You dial Shalewa. Before you can even say "Hello", Shalewa starts screaming into the microphone.',
        flagToSet: 'called_friend_early',
      },
    ],
    bgStyle: 'morning',
    ambientMood: 'romantic',
  },

  // ----------------------------------------------------
  // SCENE 2B: Mum's Lecture
  // ----------------------------------------------------
  scene_mum_lecture: {
    id: 'scene_mum_lecture',
    day: 'DAY 1',
    time: '9:30 AM',
    location: 'Dining Table',
    narrativeText:
      'Mum doesn\'t just reply—she sends a 4-minute voice note, followed by three photos of an aso-ebi lace sample priced at ₦85,000.',
    dialogue: [
      {
        sender: 'Mum ❤️',
        role: 'mum',
        text: '"I am not getting younger! Uncle Segun said there is one fine chartered accountant in Zenith Bank looking for a serious partner. I have already given him your phone number!"',
        time: '9:28 AM',
      },
    ],
    choices: [
      {
        id: 'complain_to_mum',
        text: 'PROTEST STRONGLY',
        subtext: '"Mummy! Stop giving my number to random bank staff!"',
        statDeltas: { drama: 15, love: -10 },
        nextSceneId: 'scene_friend_warning',
        consequenceTitle: 'Boundary Struggle',
        consequenceNarrative:
          'Mum sends an apology that isn\'t an apology: "I am doing it because I love you." Right after hanging up, your friend Shalewa texts you with urgent news.',
      },
      {
        id: 'send_asoebi_money',
        text: 'PAY FOR THE ASO-EBI (₦85,000)',
        subtext: 'Bribe your way into family peace and quiet.',
        statDeltas: { money: -15, cashNaira: -85000, status: 10, drama: -10 },
        nextSceneId: 'scene_friend_warning',
        consequenceTitle: 'Bank Alert Sent',
        consequenceNarrative:
          'Debit alert: ₦85,000. Mum sends 15 praying hands emojis: "My good child! Heaven will bless your pocket!" Now back to your own life.',
        flagToSet: 'paid_asoebi',
      },
    ],
    bgStyle: 'morning',
    ambientMood: 'chaotic',
  },

  // ----------------------------------------------------
  // SCENE 2C: Tobi Banter
  // ----------------------------------------------------
  scene_tobi_banter: {
    id: 'scene_tobi_banter',
    day: 'DAY 1',
    time: '9:40 AM',
    location: 'Living Room',
    narrativeText:
      'Tobi is that familiar presence in your life. Safe, charming, always available, but somehow lacking that grand ambition you privately desire.',
    dialogue: [
      {
        sender: 'Tobi',
        role: 'tobi',
        text: 'I\'m serious o. Let me pick you up for lunch at That Place in Lekki. Also, someone told me they saw your ex around Silverbird with a new person yesterday... you good?',
        time: '9:38 AM',
      },
    ],
    choices: [
      {
        id: 'brush_off_ex',
        text: 'DISMISS THE EX GOSSIP',
        subtext: '"I moved on six months ago. Don\'t bring bad energy into my day."',
        statDeltas: { status: 10, drama: -5 },
        nextSceneId: 'scene_friend_warning',
        consequenceTitle: 'Unshakable Confidence',
        consequenceNarrative:
          'You shut down the past. Tobi backs off: "Respect. You\'re focused." Then, Shalewa\'s notification pings in bold caps.',
      },
      {
        id: 'ask_for_details',
        text: 'DEMAND DETAILS ABOUT THE EX',
        subtext: '"Who was he with? What was she wearing?!"',
        statDeltas: { drama: 20, love: -10 },
        nextSceneId: 'scene_friend_warning',
        consequenceTitle: 'Wahala Stoked',
        consequenceNarrative:
          'Your heart races. Why do you still care? While you digest the petty drama, Shalewa\'s phone call breaks through.',
      },
    ],
    bgStyle: 'morning',
    ambientMood: 'dramatic',
  },

  // ----------------------------------------------------
  // SCENE 2D: Unbothered Morning
  // ----------------------------------------------------
  scene_peace_morning: {
    id: 'scene_peace_morning',
    day: 'DAY 1',
    time: '10:05 AM',
    location: 'Balcony, Lagos',
    narrativeText:
      'You sip your drink and look out over the city. Peace of mind is expensive in Nigeria, but you are committed to it. Until your door buzzer rings and your phone lights up with Shalewa\'s name.',
    dialogue: [
      {
        sender: 'Shalewa (Best Friend)',
        role: 'friend',
        text: 'Pick your phone now or I will come knock your gate down! We have an emergency!',
        time: '10:02 AM',
        isUrgent: true,
      },
    ],
    choices: [
      {
        id: 'answer_best_friend',
        text: 'ANSWER SHALEWA',
        subtext: '"What is burning down in Lagos this time?"',
        statDeltas: { drama: 10 },
        nextSceneId: 'scene_friend_warning',
        consequenceTitle: 'Friendship Duty',
        consequenceNarrative:
          'You tap answer. Shalewa takes a deep breath that sounds like an approaching hurricane.',
      },
    ],
    bgStyle: 'morning',
    ambientMood: 'tense',
  },

  // ----------------------------------------------------
  // SCENE 2E: Daniel Vetted
  // ----------------------------------------------------
  scene_daniel_vetted: {
    id: 'scene_daniel_vetted',
    day: 'DAY 1',
    time: '10:15 AM',
    location: 'Phone Screen',
    narrativeText:
      'Daniel\'s digital footprint looks too clean: Forbes Africa 30 Under 30 mention, clean cut beard, charity foundation in Ibadan, bespoke suits. But where are his friends? Why are all his comments restricted?',
    dialogue: [
      {
        sender: 'Daniel (Ikoyi)',
        role: 'daniel',
        text: 'So, do I pass your background inspection? Let me take care of you tonight. RSVP at 8:00 PM. Deal?',
        time: '10:12 AM',
      },
    ],
    choices: [
      {
        id: 'accept_dinner_cautiously',
        text: 'ACCEPT DINNER CAUTIOUSLY',
        subtext: '"Deal. But I will arrange my own transport, Daniel."',
        statDeltas: { status: 15, love: 5, drama: 5 },
        nextSceneId: 'scene_friend_warning',
        consequenceTitle: 'Playing It Smart',
        consequenceNarrative:
          'You hold your boundaries. Daniel smiles: "Independent. I love it." Now Shalewa enters the chat.',
        flagToSet: 'date_with_daniel_confirmed',
      },
    ],
    bgStyle: 'morning',
    ambientMood: 'calm',
  },

  // ----------------------------------------------------
  // SCENE 3: The Friend Warning
  // ----------------------------------------------------
  scene_friend_warning: {
    id: 'scene_friend_warning',
    day: 'DAY 1',
    time: '1:15 PM',
    location: 'Yellow Chili Restaurant, Victoria Island',
    chapterTitle: 'The Whispers of Banana Island',
    narrativeText:
      'You meet Shalewa for quick Jollof Rice. Shalewa leans across the table, her eyes wide, lowering her voice to a dramatic whisper that can still be heard by the waiter.',
    dialogue: [
      {
        sender: 'Shalewa',
        role: 'friend',
        text: 'I know Daniel reached out to you. DO NOT GO ON THAT DATE! Listen to me very carefully.',
        time: '1:18 PM',
        isUrgent: true,
      },
      {
        sender: 'Shalewa',
        role: 'friend',
        text: 'I was at Cynthia\'s bridal shower in Banana Island yesterday. Two girls were whispering that Daniel has been secretly engaged to a senator\'s daughter for eight months! She\'s currently in London doing wedding shopping!',
        time: '1:20 PM',
      },
    ],
    choices: [
      {
        id: 'investigate_daniel',
        text: 'INVESTIGATE DANIEL FIRST',
        subtext: 'Get hard proof before accusing anyone or canceling.',
        statDeltas: { status: 10, drama: 10, love: -5 },
        nextSceneId: 'scene_the_investigation',
        consequenceTitle: 'Private Detective Mode',
        consequenceNarrative:
          'You decide to verify facts like an FBI agent in Lagos. Shalewa gives you the Instagram handle of the suspected bride-to-be.',
        flagToSet: 'investigated_daniel',
      },
      {
        id: 'go_anyway_date',
        text: 'GO ON THE DATE ANYWAY',
        subtext: '"Lagos gossip is 80% lies and jealousy. I want to see for myself."',
        statDeltas: { love: 10, drama: 25, status: 5 },
        nextSceneId: 'scene_career_crossroad',
        consequenceTitle: 'Living Dangerously',
        consequenceNarrative:
          'Shalewa clutches her chest in disbelief: "You like wahala! When your eyes clear, don\'t say I didn\'t warn you!"',
        flagToSet: 'ignored_warning',
      },
      {
        id: 'cancel_the_date',
        text: 'CANCEL THE DATE RIGHT NOW',
        subtext: '"I am not entering another woman\'s relationship war."',
        statDeltas: { love: -15, drama: -15, status: 10 },
        nextSceneId: 'scene_career_crossroad',
        consequenceTitle: 'Dodged A Bullet?',
        consequenceNarrative:
          'You send a polite excuse to Daniel: "Something urgent came up at work." Daniel responds: "Disappointing... but I know how to wait for quality."',
        flagToSet: 'canceled_daniel',
      },
      {
        id: 'confront_daniel_direct',
        text: 'CONFRONT DANIEL DIRECTLY VIA CHAT',
        subtext: '"Are you engaged to someone in London? Be honest with me."',
        statDeltas: { drama: 20, status: 10, love: -10 },
        nextSceneId: 'scene_career_crossroad',
        consequenceTitle: 'Straight Shooter',
        consequenceNarrative:
          'Daniel calls back within 30 seconds laughing: "Lagos rumors! That girl is my business partner\'s sister. Come to dinner and I\'ll show you the real story."',
        flagToSet: 'confronted_daniel',
      },
    ],
    bgStyle: 'restaurant',
    ambientMood: 'tense',
  },

  // ----------------------------------------------------
  // SCENE 4: The Investigation
  // ----------------------------------------------------
  scene_the_investigation: {
    id: 'scene_the_investigation',
    day: 'DAY 1',
    time: '2:45 PM',
    location: 'Uber in Victoria Island',
    narrativeText:
      'In the backseat of your Uber, you dig into the Instagram profile Shalewa gave you: @Zainab_Vogue. Her feed is high fashion, Knightsbridge cafes, and Harrods bags. But when you scroll to 3 weeks ago...',
    dialogue: [
      {
        sender: 'Instagram Discovery',
        role: 'player',
        text: 'A photo of two champagne glasses at Radisson Blu Lagos with the caption: "With my quiet builder 💍❤️." In the reflection of the glass: the exact watch Daniel wears on his DP.',
        time: '2:48 PM',
      },
    ],
    choices: [
      {
        id: 'screenshot_evidence',
        text: 'SAVE SCREENSHOT & KEEP SMILING',
        subtext: 'Knowledge is power. Let him play his hand first.',
        statDeltas: { status: 15, drama: 15, love: -5 },
        nextSceneId: 'scene_career_crossroad',
        consequenceTitle: 'Pocketing the Receipts',
        consequenceNarrative:
          'You have the ammunition. Whether you use it tonight at dinner or keep it for later, Daniel no longer has the upper hand.',
        flagToSet: 'has_receipts',
      },
      {
        id: 'send_to_daniel',
        text: 'SEND SCREENSHOT DIRECTLY TO DANIEL',
        subtext: '"Nice watch in the glass, Daniel. Explain this."',
        statDeltas: { drama: 30, status: 10, love: -20 },
        nextSceneId: 'scene_career_crossroad',
        consequenceTitle: 'Grenade Dropped',
        consequenceNarrative:
          'Daniel\'s status changes to \'typing...\' for three uninterrupted minutes. Then: "We need to talk in person. It\'s not what you think."',
        flagToSet: 'exposed_daniel_receipts',
      },
    ],
    bgStyle: 'car',
    ambientMood: 'dramatic',
  },

  // ----------------------------------------------------
  // SCENE 5: The Career Crossroad (₦350,000 / Relocation)
  // ----------------------------------------------------
  scene_career_crossroad: {
    id: 'scene_career_crossroad',
    day: 'DAY 1',
    time: '4:15 PM',
    location: 'Corporate Workspace / Coffee Shop',
    chapterTitle: 'The Price of Ambition',
    narrativeText:
      'While your love life is doing acrobatic routines, your phone rings with an international caller ID. It\'s the HR Director of Zenith Global Ventures. You interviewed with them two weeks ago.',
    dialogue: [
      {
        sender: 'Zenith HR Director',
        role: 'boss',
        text: '"We were blown away by your assessment. We are offering you the Lead Regional Coordinator position at ₦450,000 net monthly with housing allowance and medicals."',
        time: '4:16 PM',
      },
      {
        sender: 'Zenith HR Director',
        role: 'boss',
        text: '"The catch? You must relocate to Abuja next Monday for a 12-month tenure. We need your commitment by tonight."',
        time: '4:17 PM',
        isUrgent: true,
      },
    ],
    choices: [
      {
        id: 'take_the_job',
        text: 'TAKE THE JOB (₦450k/month)',
        subtext: '"I accept. Pack my bags for Abuja! Career first."',
        statDeltas: { money: 30, cashNaira: 450000, status: 20, love: -15, drama: 10 },
        nextSceneId: 'scene_dinner_at_rsvp',
        consequenceTitle: 'Securing the Bag',
        consequenceNarrative:
          'Huge credit alert potential! You officially accepted the offer. But what happens to the romantic connections you\'re building in Lagos?',
        flagToSet: 'accepted_abuja_job',
        isDilemmaShareable: true,
        dilemmaPrompt: 'You just received a ₦450k/month job offer requiring relocation to Abuja, but romance in Lagos is heating up. Would you choose money or love?',
        dilemmaOptions: ['💰 MONEY & CAREER', '❤️ LOVE & LAGOS'],
      },
      {
        id: 'negotiate_remote',
        text: 'NEGOTIATE REMOTE / ₦600k',
        subtext: '"Make it hybrid from Lagos or increase package to ₦600k."',
        statDeltas: { status: 25, money: 15, drama: 5 },
        nextSceneId: 'scene_dinner_at_rsvp',
        consequenceTitle: 'High Stakes Negotiation',
        consequenceNarrative:
          'HR hesitates: "You drive a hard bargain. Let me speak with the Managing Partner and get back to you before midnight."',
        flagToSet: 'negotiated_job',
        isDilemmaShareable: true,
        dilemmaPrompt: 'Negotiate for ₦600k/month or take safe love in Lagos? What would you do?',
        dilemmaOptions: ['💪 NEGOTIATE HARD', '❤️ PLAY SAFE'],
      },
      {
        id: 'stay_for_love',
        text: 'REJECT THE JOB (STAY FOR LOVE)',
        subtext: '"I am staying in Lagos. Some things cannot be bought."',
        statDeltas: { love: 25, status: -10, money: -10, drama: -5 },
        nextSceneId: 'scene_dinner_at_rsvp',
        consequenceTitle: 'Heart Over Money',
        consequenceNarrative:
          'You decline the Abuja offer. A huge romantic sacrifice. Will Daniel or whoever is in Lagos actually appreciate this?',
        flagToSet: 'rejected_job_for_love',
        isDilemmaShareable: true,
        dilemmaPrompt: 'Would you reject a ₦450k relocation job to stay in Lagos for a new romantic prospect?',
        dilemmaOptions: ['❤️ STAY FOR LOVE', '💼 TAKE THE BAG'],
      },
      {
        id: 'ask_daniel_advice',
        text: 'USE IT AS A TEST WITH DANIEL',
        subtext: 'Bring up the job offer tonight to see how he reacts.',
        statDeltas: { status: 15, drama: 15, love: 5 },
        nextSceneId: 'scene_dinner_at_rsvp',
        consequenceTitle: 'The Litmus Test',
        consequenceNarrative:
          'A brilliant strategy. You will gauge Daniel\'s true intentions tonight by telling him you might leave Lagos next week.',
        flagToSet: 'test_daniel_career',
      },
    ],
    bgStyle: 'office',
    ambientMood: 'dramatic',
  },

  // ----------------------------------------------------
  // SCENE 6: Dinner at RSVP Victoria Island
  // ----------------------------------------------------
  scene_dinner_at_rsvp: {
    id: 'scene_dinner_at_rsvp',
    day: 'DAY 1',
    time: '8:15 PM',
    location: 'RSVP Restaurant & Lounge, Victoria Island',
    chapterTitle: 'The Scent of Champagne & Secrets',
    narrativeText:
      'The vibe inside RSVP is electric. Afrobeats plays in the background, low golden lighting illuminates marble tables, and Lagos high society is out in full bloom. Daniel is already seated, wearing a midnight-navy blazer and a welcoming smile.',
    dialogue: [
      {
        sender: 'Daniel',
        role: 'daniel',
        text: '"You look even more captivating in person. I already ordered the grilled tiger prawns and vintage Moët. Tell me about your day."',
        time: '8:18 PM',
      },
    ],
    choices: [
      {
        id: 'charm_daniel',
        text: 'BE CHARMING & PLAYFUL',
        subtext: 'Enjoy the luxury dinner and test his financial energy.',
        statDeltas: { love: 15, status: 15, drama: -5 },
        nextSceneId: 'scene_daniel_account_offer',
        consequenceTitle: 'Chemistry Ignited',
        consequenceNarrative:
          'The conversation flows effortlessly. Daniel is funny, observant, and clearly generous with the waitstaff. But can a man really be this perfect?',
        flagToSet: 'charmed_daniel',
      },
      {
        id: 'drop_career_bomb',
        text: 'MENTION THE ABUJA JOB OFFER',
        subtext: '"I might be moving to Abuja on Monday for work."',
        statDeltas: { status: 15, drama: 15 },
        nextSceneId: 'scene_daniel_account_offer',
        consequenceTitle: 'The Reaction',
        consequenceNarrative:
          'Daniel pauses with his champagne glass in mid-air. His smile turns serious: "Abuja? You can\'t leave Lagos. Whatever they are paying you, I can match it right here."',
        flagToSet: 'daniel_offered_match',
      },
      {
        id: 'press_on_rumors',
        text: 'SUBTLY MENTION BANANA ISLAND & ZAINAB',
        subtext: '"Do you happen to know anyone named Zainab in London?"',
        statDeltas: { drama: 25, status: 10, love: -10 },
        nextSceneId: 'scene_daniel_account_offer',
        consequenceTitle: 'The Crack in the Armor',
        consequenceNarrative:
          'Daniel coughs slightly on his drink. He wipes his mouth with a napkin. "Zainab is... complicated. We were involved last year, but it\'s over."',
        flagToSet: 'daniel_admitted_ex',
      },
    ],
    bgStyle: 'restaurant',
    ambientMood: 'romantic',
  },

  // ----------------------------------------------------
  // SCENE 7: Daniel's Financial Move
  // ----------------------------------------------------
  scene_daniel_account_offer: {
    id: 'scene_daniel_account_offer',
    day: 'DAY 1',
    time: '9:30 PM',
    location: 'RSVP Restaurant & Lounge',
    narrativeText:
      'Dinner is winding down. The waiter brings a ₦185,000 bill which Daniel settles with a black card without blinking. As you adjust your purse, Daniel leans forward on the table.',
    dialogue: [
      {
        sender: 'Daniel',
        role: 'daniel',
        text: '"I like people who are serious about their life. You\'ve been stressed about work and bills. Send me your GTBank or Kuda account details right now. Let me send you ₦500k for your weekend."',
        time: '9:32 PM',
      },
    ],
    choices: [
      {
        id: 'send_account_number',
        text: 'SEND ACCOUNT NUMBER (₦500k ALERT)',
        subtext: '"Who am I to reject blessing from above? 0123456789 GTBank."',
        statDeltas: { money: 35, cashNaira: 500000, love: 10, drama: 20 },
        nextSceneId: 'scene_the_unexpected_guest',
        consequenceTitle: 'Credit Alert Received!',
        consequenceNarrative:
          'Ping! 🔔 Your bank app notifies: CR ₦500,000.00 from Daniel K. Soft life unlocked! But taking large sums from Lagos men usually comes with strings attached.',
        flagToSet: 'accepted_money_gift',
      },
      {
        id: 'politely_decline_money',
        text: 'DECLINE THE MONEY POLITELY',
        subtext: '"Thank you, but I take care of my own bills. Keep your money."',
        statDeltas: { status: 30, love: 15, drama: -10 },
        nextSceneId: 'scene_the_unexpected_guest',
        consequenceTitle: 'Priceless Dignity',
        consequenceNarrative:
          'Daniel looks astonished and deeply impressed. "Wow. Most people in this city would have grabbed it instantly. You are truly different."',
        flagToSet: 'declined_money_gift',
      },
      {
        id: 'tell_him_invest',
        text: 'TELL HIM TO INVEST IN YOUR BUSINESS',
        subtext: '"Don\'t dash me money. Put ₦1.5M into my startup/brand instead."',
        statDeltas: { status: 25, money: 20, drama: 10 },
        nextSceneId: 'scene_the_unexpected_guest',
        consequenceTitle: 'Boss Moves',
        consequenceNarrative:
          'Daniel chuckles with admiration: "A true businesswoman/entrepreneur. Send me the pitch deck by tomorrow morning."',
        flagToSet: 'invested_in_business',
      },
    ],
    bgStyle: 'restaurant',
    ambientMood: 'tense',
  },

  // ----------------------------------------------------
  // SCENE 8: The Unexpected Guest (The Twist)
  // ----------------------------------------------------
  scene_the_unexpected_guest: {
    id: 'scene_the_unexpected_guest',
    day: 'DAY 1',
    time: '10:15 PM',
    location: 'RSVP Lounge VIP Section',
    chapterTitle: 'The Mask Falls',
    narrativeText:
      'Just as you are preparing to wrap up the evening, the heavy velvet curtain of the VIP lounge section pulls open. A stunning woman dressed in emerald green satin walks in with two friends. She stops dead in her tracks.',
    dialogue: [
      {
        sender: 'Mysterious Woman (Zainab?)',
        role: 'unknown',
        text: '"Daniel? What are you doing here? I thought you said you were in Port Harcourt attending your father\'s board meeting?!"',
        time: '10:16 PM',
        isUrgent: true,
      },
      {
        sender: 'Daniel',
        role: 'daniel',
        text: '"Zainab! Wait... how are you in Lagos? Your flight wasn\'t supposed to land until tomorrow..."',
        time: '10:17 PM',
      },
    ],
    choices: [
      {
        id: 'confront_both',
        text: 'STAND UP & CONFRONT DANIEL',
        subtext: '"Port Harcourt board meeting? Daniel, explain yourself!"',
        statDeltas: { drama: 35, status: 15, love: -20 },
        nextSceneId: 'scene_the_escape',
        consequenceTitle: 'Full Nollywood Scene',
        consequenceNarrative:
          'Heads turn across the entire restaurant. Zainab turns to you with fire in her eyes: "And who are you, my dear?!" Daniel is sweating profusely.',
        flagToSet: 'caused_public_scene',
      },
      {
        id: 'team_up_with_zainab',
        text: 'ADDRESS ZAINAB CALMLY: "SISTER, HE LIED TO US BOTH"',
        subtext: 'Solidarity over drama. Expose the player together.',
        statDeltas: { status: 30, love: -10, drama: 15 },
        nextSceneId: 'scene_the_escape',
        consequenceTitle: 'United Front',
        consequenceNarrative:
          'Zainab stops shouting and looks at you. "Did he promise you the world too?" Daniel looks like a deer caught in high-beam headlights.',
        flagToSet: 'sisterhood_coalition',
        isDilemmaShareable: true,
        dilemmaPrompt: 'You catch your date with his secret fiancée in a luxury Lagos restaurant. Do you cause a scene or team up with her?',
        dilemmaOptions: ['🔥 CAUSE A SCENE', '🤝 TEAM UP WITH HER'],
      },
      {
        id: 'leave_silently',
        text: 'WALK OUT WITH DIGNITY',
        subtext: 'Pick up your bag, order an Uber, and leave without uttering a word.',
        statDeltas: { status: 25, drama: -15, love: -10 },
        nextSceneId: 'scene_the_escape',
        consequenceTitle: 'Cold Queen/King Energy',
        consequenceNarrative:
          'You slide out of the booth with cinematic grace. You don\'t yell. You don\'t argue. You let Daniel drown in his own lies.',
        flagToSet: 'walked_out_clean',
      },
    ],
    bgStyle: 'nightclub',
    ambientMood: 'chaotic',
  },

  // ----------------------------------------------------
  // SCENE 9: The Escape & Aftermath
  // ----------------------------------------------------
  scene_the_escape: {
    id: 'scene_the_escape',
    day: 'DAY 1',
    time: '11:15 PM',
    location: 'Your Living Room, Lagos',
    chapterTitle: 'The Midnight Fallout',
    narrativeText:
      'You are back in your apartment. Your heels are off, the AC is humming, and your phone is blowing up with notifications like fireworks on New Year\'s Eve in Lagos.',
    dialogue: [
      {
        sender: 'Shalewa',
        role: 'friend',
        text: 'OMG!!! People are posting videos on Snapchat from RSVP! Did Daniel really get caught?! CALL ME!',
        time: '11:18 PM',
      },
      {
        sender: 'Tobi',
        role: 'tobi',
        text: 'I told you to be careful with those Ikoyi boys. Are you safe at home? Should I drive over?',
        time: '11:25 PM',
      },
    ],
    choices: [
      {
        id: 'debrief_with_shalewa',
        text: 'VOICE NOTE SHALEWA THE FULL STORY',
        subtext: 'Spill every detail from start to finish.',
        statDeltas: { drama: 10, status: 5 },
        nextSceneId: 'scene_the_cliffhanger',
        consequenceTitle: 'Debrief Session',
        consequenceNarrative:
          'Shalewa sends back a 7-minute voice note: "I KNEW IT! But the way you handled it? ICONIC!"',
      },
      {
        id: 'reply_tobi_comfort',
        text: 'TEXT TOBI: "I\'M FINE, THANKS FOR CHECKING"',
        subtext: 'Appreciate someone who actually cares.',
        statDeltas: { love: 15, status: 5 },
        nextSceneId: 'scene_the_cliffhanger',
        consequenceTitle: 'Soft Spot for Tobi',
        consequenceNarrative:
          'Tobi replies: "Sleep well. Tomorrow is a new day. You deserve better than games."',
        flagToSet: 'tobi_appreciated',
      },
      {
        id: 'turn_off_phone',
        text: 'POUR A GLASS OF WINE & BREATHE',
        subtext: 'Process the day in solitary peace.',
        statDeltas: { status: 15, drama: -10 },
        nextSceneId: 'scene_the_cliffhanger',
        consequenceTitle: 'Unfazed Survivor',
        consequenceNarrative:
          'One day in Lagos, and you\'ve lived a whole Nollywood movie season. You lean back on the couch...',
      },
    ],
    bgStyle: 'bedroom',
    ambientMood: 'tense',
  },

  // ----------------------------------------------------
  // SCENE 10: The Cliffhanger (11:47 PM)
  // ----------------------------------------------------
  scene_the_cliffhanger: {
    id: 'scene_the_cliffhanger',
    day: 'DAY 1',
    time: '11:47 PM',
    location: 'Your Bedroom, Lagos',
    chapterTitle: 'Episode 1 Finale: The Midnight Ring',
    narrativeText:
      'The clock hits 11:47 PM. Just as the house goes silent, your phone screen blazes in the dark. A phone call from an unknown private number, followed by an urgent text message notification.',
    dialogue: [
      {
        sender: 'DANIEL',
        role: 'daniel',
        text: 'Please. Don\'t block me. You only saw 10% of what was going on. Zainab isn\'t my fiancée—she\'s my sister\'s blackmailer, and my family\'s entire estate is at risk.',
        time: '11:46 PM',
        isUrgent: true,
      },
      {
        sender: 'DANIEL',
        role: 'daniel',
        text: 'I am outside your gate right now. Please come down. You need to know the truth about what happened.',
        time: '11:47 PM',
        isUrgent: true,
      },
    ],
    choices: [
      {
        id: 'answer_cliffhanger_call',
        text: 'ANSWER THE CALL & GO TO THE GATE',
        subtext: 'Face the truth, whatever the danger or drama.',
        statDeltas: { drama: 30, love: 10 },
        nextSceneId: 'scene_episode_end',
        consequenceTitle: 'Opening Pandora\'s Box',
        consequenceNarrative:
          'Your heart pounds against your ribs. You grab your keys, slip on your slippers, and take a deep breath before opening the door...',
        flagToSet: 'confronted_at_gate',
      },
      {
        id: 'ignore_and_lock_gate',
        text: 'LOCK YOUR DOOR & CALL SECURITY',
        subtext: '"Not today, Daniel. You don\'t own me."',
        statDeltas: { status: 25, drama: 10, love: -10 },
        nextSceneId: 'scene_episode_end',
        consequenceTitle: 'Standing On Business',
        consequenceNarrative:
          'You double-bolt your door and text the estate gate security: "Do not let that black Mercedes past the entrance."',
        flagToSet: 'called_estate_security',
      },
    ],
    bgStyle: 'bedroom',
    ambientMood: 'dramatic',
    isCliffhanger: true,
  },
};
