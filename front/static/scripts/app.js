angular.module('AngularApp', ['ui.router', 'pascalprecht.translate', 'satellizer', 'ngCookies', 'toastr']).config(function($stateProvider, $urlRouterProvider, $translateProvider, $authProvider) {

	$urlRouterProvider.otherwise('/welcome');
	
	$stateProvider
	
		.state('base', { templateUrl: '/static/pages/_base.html', })
		
			.state('base.welcome',    { url: '/welcome',    templateUrl: '/static/pages/welcome.html',    data:{ labelKey: 'welcome_PAGETITLE',    }})
			.state('base.restricted', { url: '/restricted', templateUrl: '/static/pages/restricted.html', data:{ labelKey: 'restricted_PAGETITLE', }})
			
			.state('base.account', { templateUrl: '/static/pages/_account.html', })
			
				.state('base.account.login',    { url: '/login',    templateUrl: '/static/pages/login.html',    data:{ labelKey: 'login_PAGETITLE',    }})
				.state('base.account.register', { url: '/register', templateUrl: '/static/pages/register.html', data:{ labelKey: 'register_PAGETITLE', }})

		.state('app', { templateUrl: '/static/pages/_app.html', })
		
			.state('app.profile', { templateUrl: '/static/pages/_profile.html', })
			
				.state('app.profile.view', { url: '/profile',      templateUrl: '/static/pages/profile_view.html', data:{ labelKey: 'profile_PAGETITLE',      authenticated: true }})
				.state('app.profile.edit', { url: '/profile/edit', templateUrl: '/static/pages/profile_edit.html', data:{ labelKey: 'profile_edit_PAGETITLE', authenticated: true }})
			
			.state('app.pokedex', { templateUrl: '/static/pages/_pokedex.html', })
			
				.state('app.pokedex.add',  { url: '/pokedex/add', templateUrl: '/static/pages/pokedex_add.html',  data:{ labelKey: 'pokedex_add_PAGETITLE',  authenticated: true }})
				.state('app.pokedex.view', { url: '/pokedex',     templateUrl: '/static/pages/pokedex_view.html', data:{ labelKey: 'pokedex_view_PAGETITLE', authenticated: true }})
				
			.state('app.pokemon', { templateUrl: '/static/pages/_pokemon.html', })
			
				.state('app.pokemon.edit', { url: '/pokemon/:ref/edit', templateUrl: '/static/pages/pokemon_edit.html', data:{ labelKey: 'pokemon_edit_PAGETITLE', authenticated: true }})
				.state('app.pokemon.view', { url: '/pokemon/:ref',      templateUrl: '/static/pages/pokemon_view.html', data:{ labelKey: 'pokemon_view_PAGETITLE', authenticated: true }})
	
	$translateProvider.useSanitizeValueStrategy(null);
	
	$translateProvider.preferredLanguage('fr');
	
	$translateProvider.translations('en', {
	});
	
	$translateProvider.translations('fr', {
		
		error_EMAIL: 'Une adresse email bien formattée est requise.',
		error_REQUIRED: 'Ce champ est obligatoire.',
		error_NOELEMENT: 'Aucun élément',
		error_INTEGRITY_ERROR: 'Une erreur server est survenue.',
		
		notif_ERROR: 'Une erreur est survenue',
		notif_SUCCESS: 'Opération réussie',
		
		btn_NO: 'Non',
		btn_YES: 'Oui',
		
		/* Pokemon */
		
		pokemon_CP: 'PC',
		pokemon_HP: 'PV',
		pokemon_CODE: 'Pokémon',
		pokemon_NAME: 'Nom',
		pokemon_TEAM: 'Equipe',
		pokemon_LEVEL: 'Niveau',
		pokemon_ATTACK: 'Attaque',
		pokemon_PERCENT: 'Perfection',
		pokemon_DEFENSE: 'Défense',
		pokemon_FINALCP: 'PC Niv 40',
		pokemon_FINALHP: 'PV Niv 40',
		pokemon_STIGMATA: 'Endurance',
		pokemon_STARDUST: 'Poussière',
		pokemon_CANDIESREQUIRED: 'Bonbons requis',
		pokemon_STARDUSTREQUIRED: 'Poussière requise',
		
		pokemon_APP1: 'Dans l\'ensemble, ton pokémon ...',
		pokemon_APP2: 'Son meilleur atout ...',
		pokemon_APP3: 'Ses statistiques ...',
		
		pokemon_app1_CHOICE3_red: '... n’est pas un combattant mais je l’aime bien.',
		pokemon_app1_CHOICE2_red: '... est un pokémon solide.',
		pokemon_app1_CHOICE1_red: '... est très fort, tu dois être fier.',
		pokemon_app1_CHOICE0_red: '... m’étonne beaucoup, il peut tout faire.',
		
		pokemon_app1_CHOICE3_blue: '... n’ira pas très loin au combat.',
		pokemon_app1_CHOICE2_blue: '... est supérieur à la moyenne.',
		pokemon_app1_CHOICE1_blue: '... a retenu toute mon attention.',
		pokemon_app1_CHOICE0_blue: '... est une merveille. Un pokémon captivant !',

		pokemon_app1_CHOICE3_yellow: '... peut devenir un meilleur combattant.',
		pokemon_app1_CHOICE2_yellow: '... est plutôt bien.',
		pokemon_app1_CHOICE1_yellow: '... est vraiment fort.',
		pokemon_app1_CHOICE0_yellow: '... semble être capable de tenir tête aux meilleurs.',
		
		pokemon_app3_CHOICE3_red: 'Je suis renversée par ses statistiques. WOW !',
		pokemon_app3_CHOICE2_red: 'Il a d\'excellentes statistiques ! Que c\'est excitant !',
		pokemon_app3_CHOICE1_red: 'Ses statistiques indiquent qu\'en combat, il fera le job.',
		pokemon_app3_CHOICE0_red: 'Ses statistiques ne font pas espérer d\'excellentes batailles.',
		
		pokemon_app3_CHOICE3_blue: 'Ses statistiques ne dépassent pas de la moyenne à mon avis.',
		pokemon_app3_CHOICE2_blue: 'Ses statistiques tendent notablement vers le positif.',
		pokemon_app3_CHOICE1_blue: 'Je suis certainement impressionnée par ses statistiques, je dois le dire !',
		pokemon_app3_CHOICE0_blue: 'Ses statistiques dépassent mes calculs. C\'est incroyable !',
		
		pokemon_app3_CHOICE3_yellow: 'Ses statistiques sont bien, mais plutôt basiques, d\'après ce que je vois.',
		pokemon_app3_CHOICE2_yellow: 'Il a définitivement quelques bonnes statistiques. Définitivement !',
		pokemon_app3_CHOICE1_yellow: 'Ses statistiques sont vraiment fortes ! Impressionnant.',
		pokemon_app3_CHOICE0_yellow: 'Ses statistiques sont les meilleures que j\'ai jamais vues ! Aucun doute là dessus !',
		
		pokemon_sort_PERCENT: 'par perfection',
		pokemon_sort_DEXNUMBER: 'par numéro de pokédex',
		pokemon_sort_NAME: 'par nom',
		pokemon_sort_ATTACK: 'par IV d\'attaque',
		pokemon_sort_DEFENSE: 'par IV de défense',
		pokemon_sort_STIGMATA: 'par IV d\'endurance',
		
		/* Team */
		
		team_RED: 'Bravoure',
		team_BLUE: 'Sagesse',
		team_YELLOW: 'Intuition',
		
		/* Welcome */
		
		welcome_PAGETITLE: 'Bienvenue!',
		
		welcome_TITLE: 'Accueil',
		
		welcome_TEXT: 'Enregistrez, évaluez et partagez vos pokémons préférés',
		
		welcome_BTN: 'Entrez !',
		
		/* Login */
		
		login_PAGETITLE: 'Connexion',
		
		login_LINK: 'Se connecter',
		
		login_local_BTN: 'Se connecter',
		login_facebook_BTN: 'Se connecter avec Facebook',
		
		login_SUBTITLE: 'Se connecter avec un compte local',
		
		login_pwd_PLACEHOLDER: 'Mot de passe',
		login_user_PLACEHOLDER: 'Nom d\'utilisateur',
		
		login_TEXT: 'Pas de compte local ?',
		
		error_USER_UNKNOWN: 'Le nom d\'utilisateur et/ou le mot de passe ne correspondent pas à un utilisateur connu. Veuillez vérifier et réessayer.',
		
		/* Register */
		
		register_PAGETITLE: 'Inscription',
		
		register_LINK: 'S\'inscrire',
		
		register_user_PLACEHOLDER: 'Nom d\'utilisateur',
		register_pwd1_PLACEHOLDER: 'Mot de passe',
		register_pwd2_PLACEHOLDER: 'Confirmer le mot de passe',
		register_email_PLACEHOLDER: 'Email',
		
		register_TEXT1: 'En cliquant sur \'S\'inscire\', vous déclarez être en accord avec les conditions et la politique des données privées',
		register_TEXT2: 'Déjà inscrit ?',
		
		register_BTN: 'S\'inscrire',
		
		error_PASSWORDS_NOT_EQUAL: 'Les mots de passe saisis ne sont pas identiques.',
		error_USERNAME_ALREADY_EXISTS: 'Un utilisateur avec ce nom existe déjà.',
		
		/* Restricted */
		
		restricted_PAGETITLE: 'Non autorisé',
		
		restricted_TEXT: 'Vous avez tenté d\'accéder à un contenu protégé. Vous devez vous authentifier avant de pouvoir accéder à ce contenu.',
		
		/* Logout */
		
		logout_LINK: 'Se déconnecter',
		
		/* Profile */
		
		profile_PAGETITLE: 'Profil',
		
		profile_LINK: 'Profil',
		
		profile_TITLE: 'Profil',
		
		profile_TEAM: 'Equipe',
		profile_LEVEL: 'Niveau',
		
		profile_NOPROFILE: 'Aucun profil',
		
		profile_NOTEAM: 'aucune équipe sélectionnée',
		profile_NOLEVEL: 'aucun niveau renseigné',
		
		/* Edit profile */
		
		profile_edit_PAGETITLE: 'Modifier le profil',
		
		profile_edit_LINK: 'Modifier',
		
		profile_edit_TITLE: 'Modifier le profil',
		
		profile_edit_BTN: 'Modifier',
		
		/* List pokemons */
		
		pokedex_view_PAGETITLE: 'Mes pokémons',
		
		pokedex_view_LINK: 'Mes pokémons',
		
		pokedex_view_TITLE: 'Mes pokémons',
		
		pokedex_view_NOPOKEMON: 'Ajoutez autant de pokémons que vous le souhaitez en appyuant sur ',
		
		/* Add pokemon */
		
		pokedex_add_PAGETITLE: 'Ajouter un pokémon',
		
		pokedex_add_LINK: 'Ajouter',
		
		pokedex_add_TITLE: 'Ajouter un pokémon',

		pokedex_add_BTN1: 'Evaluer',
		pokedex_add_BTN2: 'Ajouter',
		
		pokedex_add_NORESULT: 'Aucun résultat possible',
		
		pokedex_add_RESULT: 'Résultat',
		
		pokedex_add_LEVEL: 'Niveau du dresseur',

		/* Pokemon view */
		
		pokemon_view_PAGETITLE: 'Pokémon',
		
		pokemon_view_CURRENT: 'Status',
		
		pokemon_view_ONMAX: 'Votre pokémon est rechargé au max !',
		pokemon_view_NOTMAX: 'Votre pokémon peut encore être rechargé !',
		
		pokemon_view_NOSTATUS: 'Le status de votre pokémon n\'a pas pu être calculé car votre profil n\'est as renseigné!',

		pokemon_view_PROFILELINK: 'Renseigner mon profil',

		/* Pokemon edit */
		
		pokemon_edit_PAGETITLE: 'Modifier un pokémon',
		
		pokemon_edit_TITLE: 'Modifier',
		
		pokemon_edit_BTN: 'Enregistrer',
		
		/* Pokemon delete */
		
		pokemon_delete_CONFIRM: 'Etes-vous sûr de vouloir supprimer ce pokémon ?',
		
		/* Pokemon labels */

		pokemon_squirtle_LABEL: 'Carapuce',
		pokemon_ivysaur_LABEL: 'Herbizarre',
		pokemon_wartortle_LABEL: 'Carabaffe',
		pokemon_venusaur_LABEL: 'Florizarre',
		pokemon_charizard_LABEL: 'Dracaufeu',
		pokemon_bulbasaur_LABEL: 'Bulbizarre',
		pokemon_charmander_LABEL: 'Salamèche',
		pokemon_charmeleon_LABEL: 'Reptincel',
		pokemon_blastoise_LABEL: 'Tortank',
		pokemon_caterpie_LABEL: 'Chenipan',
		pokemon_metapod_LABEL: 'Chrysacier',
		pokemon_butterfree_LABEL: 'Papilusion',
		pokemon_weedle_LABEL: 'Aspicot',
		pokemon_kakuna_LABEL: 'Coconfort',
		pokemon_beedrill_LABEL: 'Dardargnan',
		pokemon_pidgey_LABEL: 'Roucool',
		pokemon_pidgeotto_LABEL: 'Roucoups',
		pokemon_pidgeot_LABEL: 'Roucarnage',
		pokemon_rattata_LABEL: 'Rattata',
		pokemon_raticate_LABEL: 'Rattatac',
		pokemon_spearow_LABEL: 'Piafabec',
		pokemon_fearow_LABEL: 'Rapasdepic',
		pokemon_ekans_LABEL: 'Abo',
		pokemon_arbok_LABEL: 'Arbok',
		pokemon_pikachu_LABEL: 'Pikachu',
		pokemon_raichu_LABEL: 'Raichu',
		pokemon_sandshrew_LABEL: 'Sabelette',
		pokemon_sandslash_LABEL: 'Sablaireau',
		pokemon_nidoranfemale_LABEL: 'Nidoran♀',
		pokemon_nidorina_LABEL: 'Nidorina',
		pokemon_nidoqueen_LABEL: 'Nidoqueen',
		pokemon_nidoranmale_LABEL: 'Nidoran♂',
		pokemon_nidorino_LABEL: 'Nidorino',
		pokemon_nidoking_LABEL: 'Nidoking',
		pokemon_clefairy_LABEL: 'Mélofée',
		pokemon_clefable_LABEL: 'Mélodelfe',
		pokemon_vulpix_LABEL: 'Goupix',
		pokemon_ninetales_LABEL: 'Feunard',
		pokemon_jigglypuff_LABEL: 'Rondoudou',
		pokemon_wigglytuff_LABEL: 'Grodoudou',
		pokemon_zubat_LABEL: 'Nosferapti',
		pokemon_golbat_LABEL: 'Nosferalto',
		pokemon_oddish_LABEL: 'Mystherbe',
		pokemon_gloom_LABEL: 'Ortide',
		pokemon_vileplume_LABEL: 'Rafflesia',
		pokemon_paras_LABEL: 'Paras',
		pokemon_parasect_LABEL: 'Parasect',
		pokemon_venonat_LABEL: 'Mimitoss',
		pokemon_venomoth_LABEL: 'Aéromite',
		pokemon_diglett_LABEL: 'Taupiqueur',
		pokemon_dugtrio_LABEL: 'Triopikeur',
		pokemon_meowth_LABEL: 'Miaouss',
		pokemon_persian_LABEL: 'Persian',
		pokemon_psyduck_LABEL: 'Psykokwak',
		pokemon_golduck_LABEL: 'Akwakwak',
		pokemon_mankey_LABEL: 'Férosinge',
		pokemon_primeape_LABEL: 'Colossinge',
		pokemon_growlithe_LABEL: 'Caninos',
		pokemon_arcanine_LABEL: 'Arcanin',
		pokemon_poliwag_LABEL: 'Ptitard',
		pokemon_poliwhirl_LABEL: 'Têtarte',
		pokemon_poliwrath_LABEL: 'Tartard',
		pokemon_abra_LABEL: 'Abra',
		pokemon_kadabra_LABEL: 'Kadabra',
		pokemon_alakazam_LABEL: 'Alakazam',
		pokemon_machop_LABEL: 'Machoc',
		pokemon_machoke_LABEL: 'Machopeur',
		pokemon_machamp_LABEL: 'Mackogneur',
		pokemon_bellsprout_LABEL: 'Chétiflor',
		pokemon_weepinbell_LABEL: 'Boustiflor',
		pokemon_victreebel_LABEL: 'Empiflor',
		pokemon_tentacool_LABEL: 'Tentacool',
		pokemon_tentacruel_LABEL: 'Tentacruel',
		pokemon_geodude_LABEL: 'Racaillou',
		pokemon_graveler_LABEL: 'Gravalanch',
		pokemon_golem_LABEL: 'Grolem',
		pokemon_ponyta_LABEL: 'Ponyta',
		pokemon_rapidash_LABEL: 'Galopa',
		pokemon_slowpoke_LABEL: 'Ramoloss',
		pokemon_slowbro_LABEL: 'Flagadoss',
		pokemon_magnemite_LABEL: 'Magnéti',
		pokemon_magneton_LABEL: 'Magnéton',
		pokemon_farfetchd_LABEL: 'Canarticho',
		pokemon_doduo_LABEL: 'Doduo',
		pokemon_dodrio_LABEL: 'Dodrio',
		pokemon_seel_LABEL: 'Otaria',
		pokemon_dewgong_LABEL: 'Lamantine',
		pokemon_grimer_LABEL: 'Tadmorv',
		pokemon_muk_LABEL: 'Grotadmorv',
		pokemon_shellder_LABEL: 'Grotadmorv',
		pokemon_cloyster_LABEL: 'Crustabri',
		pokemon_gastly_LABEL: 'Fantominus',
		pokemon_haunter_LABEL: 'Spectrum',
		pokemon_gengar_LABEL: 'Ectoplasma',
		pokemon_onix_LABEL: 'Onix',
		pokemon_drowzee_LABEL: 'Soporifik',
		pokemon_hypno_LABEL: 'Hypnomade',
		pokemon_krabby_LABEL: 'Krabby',
		pokemon_kingler_LABEL: 'Krabboss',
		pokemon_voltorb_LABEL: 'Voltorbe',
		pokemon_electrode_LABEL: 'Électrode',
		pokemon_exeggcute_LABEL: 'Nœunœuf',
		pokemon_exeggutor_LABEL: 'Noadkoko',
		pokemon_cubone_LABEL: 'Osselait',
		pokemon_marowak_LABEL: 'Ossatueur',
		pokemon_hitmonlee_LABEL: 'Kicklee',
		pokemon_hitmonchan_LABEL: 'Tygnon',
		pokemon_lickitung_LABEL: 'Excelangue',
		pokemon_koffing_LABEL: 'Smogo',
		pokemon_weezing_LABEL: 'Smogogo',
		pokemon_rhyhorn_LABEL: 'Rhinocorne',
		pokemon_rhydon_LABEL: 'Rhinoféros',
		pokemon_chansey_LABEL: 'Leveinard',
		pokemon_tangela_LABEL: 'Saquedeneu',
		pokemon_kangaskhan_LABEL: 'Kangourex',
		pokemon_horsea_LABEL: 'Hypotrempe',
		pokemon_seadra_LABEL: 'Hypocéan',
		pokemon_goldeen_LABEL: 'Poissirène',
		pokemon_seaking_LABEL: 'Poissoroy',
		pokemon_staryu_LABEL: 'Stari',
		pokemon_starmie_LABEL: 'Staross',
		pokemon_mrmime_LABEL: 'M. Mime',
		pokemon_scyther_LABEL: 'Insécateur',
		pokemon_jynx_LABEL: 'Lippoutou',
		pokemon_electabuzz_LABEL: 'Élektek',
		pokemon_magmar_LABEL: 'Magmar',
		pokemon_pinsir_LABEL: 'Scarabrute',
		pokemon_tauros_LABEL: 'Tauros',
		pokemon_magikarp_LABEL: 'Magicarpe',
		pokemon_gyarados_LABEL: 'Léviator',
		pokemon_lapras_LABEL: 'Lokhlass',
		pokemon_ditto_LABEL: 'Métamorph',
		pokemon_eevee_LABEL: 'Évoli',
		pokemon_vaporeon_LABEL: 'Aquali',
		pokemon_jolteon_LABEL: 'Voltali',
		pokemon_flareon_LABEL: 'Pyroli',
		pokemon_porygon_LABEL: 'Porygon',
		pokemon_omanyte_LABEL: 'Amonita',
		pokemon_omastar_LABEL: 'Amonistar',
		pokemon_kabuto_LABEL: 'Kabuto',
		pokemon_kabutops_LABEL: 'Kabutops',
		pokemon_aerodactyl_LABEL: 'Ptéra',
		pokemon_snorlax_LABEL: 'Ronflex',
		pokemon_dratini_LABEL: 'Minidraco',
		pokemon_dragonair_LABEL: 'Draco',
		pokemon_dragonite_LABEL: 'Dracolosse',
		pokemon_chikorita_LABEL: 'Germignon',
		pokemon_bayleef_LABEL: 'Macronium',
		pokemon_meganium_LABEL: 'Méganium',
		pokemon_cyndaquil_LABEL: 'Héricendre',
		pokemon_quilava_LABEL: 'Feurisson',
		pokemon_typhlosion_LABEL: 'Typhlosion',
		pokemon_totodile_LABEL: 'Kaiminus',
		pokemon_croconaw_LABEL: 'Crocrodil',
		pokemon_feraligatr_LABEL: 'Aligatueur',
		pokemon_sentret_LABEL: 'Fouinette',
		pokemon_furret_LABEL: 'Fouinar',
		pokemon_hoothoot_LABEL: 'Hoothoot',
		pokemon_noctowl_LABEL: 'Noarfang',
		pokemon_ledyba_LABEL: 'Coxy',
		pokemon_ledian_LABEL: 'Coxyclaque',
		pokemon_spinarak_LABEL: 'Mimigal',
		pokemon_ariados_LABEL: 'Migalos',
		pokemon_crobat_LABEL: 'Nostenfer',
		pokemon_chinchou_LABEL: 'Loupio',
		pokemon_lanturn_LABEL: 'Lanturn',
		pokemon_pichu_LABEL: 'Pichu',
		pokemon_cleffa_LABEL: 'Mélo',
		pokemon_igglybuff_LABEL: 'Toudoudou',
		pokemon_togepi_LABEL: 'Togepi',
		pokemon_togetic_LABEL: 'Togetic',
		pokemon_natu_LABEL: 'Natu',
		pokemon_xatu_LABEL: 'Xatu',
		pokemon_mareep_LABEL: 'Wattouat',
		pokemon_flaaffy_LABEL: 'Lainergie',
		pokemon_ampharos_LABEL: 'Pharamp',
		pokemon_bellossom_LABEL: 'Joliflor',
		pokemon_marill_LABEL: 'Marill',
		pokemon_azumarill_LABEL: 'Azumarill',
		pokemon_sudowoodo_LABEL: 'Simularbre',
		pokemon_politoed_LABEL: 'Tarpaud',
		pokemon_hoppip_LABEL: 'Granivol',
		pokemon_skiploom_LABEL: 'Floravol',
		pokemon_jumpluff_LABEL: 'Cotovol',
		pokemon_aipom_LABEL: 'Capumain',
		pokemon_sunkern_LABEL: 'Tournegrin',
		pokemon_sunflora_LABEL: 'Héliatronc',
		pokemon_yanma_LABEL: 'Yanma',
		pokemon_wooper_LABEL: 'Axoloto',
		pokemon_quagsire_LABEL: 'Maraiste',
		pokemon_espeon_LABEL: 'Mentali',
		pokemon_umbreon_LABEL: 'Noctali',
		pokemon_murkrow_LABEL: 'Cornèbre',
		pokemon_slowking_LABEL: 'Roigada',
		pokemon_misdreavus_LABEL: 'Feuforêve',
		pokemon_unown_LABEL: 'Zarbi',
		pokemon_wobbuffet_LABEL: 'Qulbutoké',
		pokemon_girafarig_LABEL: 'Girafarig',
		pokemon_pineco_LABEL: 'Pomdepik',
		pokemon_forretress_LABEL: 'Foretress',
		pokemon_dunsparce_LABEL: 'Insolourdo',
		pokemon_gligar_LABEL: 'Scorplane',
		pokemon_steelix_LABEL: 'Steelix',
		pokemon_snubbull_LABEL: 'Snubbull',
		pokemon_granbull_LABEL: 'Granbull',
		pokemon_qwilfish_LABEL: 'Qwilfish',
		pokemon_scizor_LABEL: 'Cizayox',
		pokemon_shuckle_LABEL: 'Caratroc',
		pokemon_heracross_LABEL: 'Scarhino',
		pokemon_sneasel_LABEL: 'Farfuret',
		pokemon_teddiursa_LABEL: 'Teddiursa',
		pokemon_ursaring_LABEL: 'Ursaring',
		pokemon_slugma_LABEL: 'Limagma',
		pokemon_magcargo_LABEL: 'Volcaropod',
		pokemon_swinub_LABEL: 'Marcacrin',
		pokemon_piloswine_LABEL: 'Cochignon',
		pokemon_corsola_LABEL: 'Corayon',
		pokemon_remoraid_LABEL: 'Rémoraid',
		pokemon_octillery_LABEL: 'Octillery',
		pokemon_mantine_LABEL: 'Démanta',
		pokemon_skarmory_LABEL: 'Airmure',
		pokemon_houndour_LABEL: 'Malosse',
		pokemon_houndoom_LABEL: 'Démolosse',
		pokemon_kingdra_LABEL: 'Hyporoi',
		pokemon_phanpy_LABEL: 'Phanpy',
		pokemon_donphan_LABEL: 'Donphan',
		pokemon_porygon2_LABEL: 'Porygon2',
		pokemon_stantler_LABEL: 'Cerfrousse',
		pokemon_tyrogue_LABEL: 'Debugant',
		pokemon_hitmontop_LABEL: 'Kapoera',
		pokemon_smoochum_LABEL: 'Lippouti',
		pokemon_elekid_LABEL: 'Élekid',
		pokemon_magby_LABEL: 'Magby',
		pokemon_miltank_LABEL: 'Écrémeuh',
		pokemon_blissey_LABEL: 'Leuphorie',
		pokemon_larvitar_LABEL: 'Embrylex',
		pokemon_pupitar_LABEL: 'Ymphect',
		pokemon_tyranitar_LABEL: 'Tyranocif',
	});
	
	$authProvider.facebook({
		
		url: '/login/social/token_user/facebook',
		clientId: '362521904117518'
	});

	$authProvider.authToken = 'Token';
	$authProvider.tokenType = 'Token';
});

angular.module('AngularApp').config(function(toastrConfig) {
	
	angular.extend(toastrConfig, {
		
		target: '#toast-content',
		timeOut: 2500,
		positionClass: 'toast-top-full-width',
	});
});

angular.module('AngularApp').run(function($rootScope, $state, $translate, $auth) {
	
	var lang = window.navigator.language || window.navigator.userLanguage;
	if (lang === 'fr') $translate.use('fr');
	
	$rootScope.state = $state;
	
	$rootScope.$on('$stateChangeStart', function(event, toState) {
		
		if (toState.data.authenticated && !$auth.isAuthenticated()) {
			
			event.preventDefault();
			$state.go('base.restricted', { location: 'replace' });
		}
	});
	
	$rootScope.isAuthenticated = function() { return $auth.isAuthenticated(); };
});
