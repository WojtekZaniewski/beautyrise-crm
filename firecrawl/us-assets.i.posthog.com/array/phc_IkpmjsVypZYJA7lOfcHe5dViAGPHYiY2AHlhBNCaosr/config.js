(function() {
    window._POSTHOG_REMOTE_CONFIG = window._POSTHOG_REMOTE_CONFIG || {};
    window._POSTHOG_REMOTE_CONFIG['phc_IkpmjsVypZYJA7lOfcHe5dViAGPHYiY2AHlhBNCaosr'] = {
        config: {
            "analytics": {
                "endpoint": "/i/v0/e/"
            },
            "autocaptureExceptions": false,
            "autocapture_opt_out": true,
            "captureDeadClicks": false,
            "capturePerformance": {
                "network_timing": true,
                "web_vitals": false,
                "web_vitals_allowed_metrics": null
            },
            "conversations": false,
            "defaultIdentifiedOnly": true,
            "elementsChainAsString": true,
            "errorTracking": {
                "autocaptureExceptions": false,
                "suppressionRules": []
            },
            "hasFeatureFlags": true,
            "heatmaps": false,
            "logs": {
                "captureConsoleLogs": false
            },
            "productTours": false,
            "quotaLimited": ["recordings"],
            "sdkVersion": {
                "requested": "1"
            },
            "sessionRecording": false,
            "supportedCompression": ["gzip", "gzip-js"],
            "surveys": [{
                "appearance": {
                    "autoDisappear": true,
                    "backgroundColor": "#eeeded",
                    "borderColor": "#c9c6c6",
                    "borderRadius": "10px",
                    "boxPadding": "20px 24px",
                    "boxShadow": "0 4px 12px rgba(0, 0, 0, 0.15)",
                    "disabledButtonOpacity": "0.6",
                    "displayThankYouMessage": true,
                    "fontFamily": "inherit",
                    "inputBackground": "white",
                    "maxWidth": "300px",
                    "placeholder": "Start typing...",
                    "position": "right",
                    "ratingButtonActiveColor": "black",
                    "ratingButtonColor": "white",
                    "shuffleQuestions": false,
                    "submitButtonColor": "black",
                    "submitButtonTextColor": "white",
                    "textSubtleColor": "#939393",
                    "thankYouMessageDescription": "",
                    "thankYouMessageHeader": "Thank you for your feedback!",
                    "whiteLabel": false,
                    "zIndex": "2147482647"
                },
                "conditions": {
                    "url": "https://www.firecrawl.dev/app"
                },
                "current_iteration": null,
                "current_iteration_start_date": null,
                "enable_partial_responses": true,
                "end_date": null,
                "id": "019989e7-7fe4-0000-2b44-546f1eae4af8",
                "internal_targeting_flag_key": "survey-targeting-18e53dae9f-custom",
                "linked_flag_key": "users_who_used_more_than_20_percent_of_credits",
                "name": "Net promoter score (NPS)",
                "questions": [{
                    "description": "",
                    "descriptionContentType": "text",
                    "display": "number",
                    "id": "33f9a9a3-d49b-437d-b452-7f0877c30712",
                    "lowerBoundLabel": "Unlikely",
                    "question": "How likely are you to recommend us to a friend?",
                    "scale": 10,
                    "skipSubmitButton": true,
                    "type": "rating",
                    "upperBoundLabel": "Very likely"
                }, {
                    "description": "",
                    "descriptionContentType": "text",
                    "id": "95d06b76-10f4-4fda-a903-0a9cfb1fa553",
                    "question": "What else can we do to improve your experience?",
                    "type": "open"
                }],
                "schedule": "once",
                "start_date": null,
                "type": "popover"
            }, {
                "appearance": {
                    "backgroundColor": "#fafafa",
                    "borderColor": "#c9c6c6",
                    "displayThankYouMessage": true,
                    "placeholder": "Start typing...",
                    "position": "center",
                    "ratingButtonActiveColor": "black",
                    "ratingButtonColor": "white",
                    "submitButtonColor": "#f97316",
                    "thankYouMessageHeader": "Thank you for your feedback!",
                    "whiteLabel": false
                },
                "conditions": {
                    "url": "app"
                },
                "current_iteration": null,
                "current_iteration_start_date": null,
                "enable_partial_responses": false,
                "end_date": "2024-07-30T00:54:40.326000Z",
                "id": "019100f4-b0df-0000-a588-a53271bb8175",
                "internal_targeting_flag_key": "survey-targeting-ba22aa34ee-custom",
                "name": "General Survey",
                "questions": [{
                    "buttonText": "Submit",
                    "choices": ["Tutorials", "Customer case studies", "Product announcements"],
                    "description": "Your usecase. For example, \"scraping company data for mass personalization.\"\n",
                    "descriptionContentType": "text",
                    "id": "e6183c33-03d1-4f13-be00-824314f836ea",
                    "originalQuestionIndex": 0,
                    "question": "What are you using Firecrawl for?",
                    "type": "open"
                }, {
                    "branching": {
                        "responseValues": {
                            "0": 2,
                            "1": "end"
                        },
                        "type": "response_based"
                    },
                    "buttonText": "Submit",
                    "choices": ["Yes", "No"],
                    "description": "",
                    "descriptionContentType": "text",
                    "id": "aee310b0-d85c-4b10-b82d-304e0aecb09d",
                    "originalQuestionIndex": 1,
                    "question": "Are you still evaluating Firecrawl?",
                    "type": "single_choice"
                }, {
                    "buttonText": "Submit",
                    "choices": ["< 100 ", "100 - 1000", "1000 - 10,000", "10,000 - 100,000", "100,000 - 1,000,000", "1,000,000 +"],
                    "description": "",
                    "descriptionContentType": "text",
                    "id": "3959e7ea-3d1a-49a5-a612-8fa9cbc4102c",
                    "originalQuestionIndex": 2,
                    "question": "How many websites do you plan on scraping each month?",
                    "type": "multiple_choice"
                }],
                "schedule": "once",
                "start_date": "2024-07-30T00:22:38.532000Z",
                "targeting_flag_key": "survey-targeting-4de3899485",
                "type": "popover"
            }],
            "token": "phc_IkpmjsVypZYJA7lOfcHe5dViAGPHYiY2AHlhBNCaosr"
        },
        siteApps: []
    }
})();