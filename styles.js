import { StyleSheet } from 'react-native';

// Maritimt farvetema: navy, hvid, og en varm accentfarve til handling
export const NAVY = '#0B3D5C';
const LIGHT_BLUE = '#EAF2F8';
const ACCENT = '#E8734A';
const WHITE = '#FFFFFF';
const GREY_TEXT = '#5A6B75';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BLUE,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: NAVY,
    marginBottom: 12,
  },
  list: {
    paddingBottom: 12,
  },

  // Tjekliste
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: NAVY,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: NAVY,
  },
  checkboxMark: {
    color: WHITE,
    fontSize: 14,
    fontWeight: 'bold',
  },
  listItemText: {
    fontSize: 15,
    color: NAVY,
  },
  listItemTextDone: {
    color: GREY_TEXT,
    textDecorationLine: 'line-through',
  },

  // Kontakter
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    color: NAVY,
  },
  contactRole: {
    fontSize: 13,
    color: GREY_TEXT,
    marginTop: 2,
  },
  callButton: {
    backgroundColor: ACCENT,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  callButtonText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 13,
  },

  // Fælles knapper og input
  primaryButton: {
    backgroundColor: NAVY,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    backgroundColor: WHITE,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CBD9E0',
  },

  // --- Iteration 2 ---
  flexOne: {
    flex: 1,
  },
  secondaryButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: NAVY,
    backgroundColor: WHITE,
  },
  secondaryButtonText: {
    color: NAVY,
    fontSize: 15,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  inputLabel: {
    fontSize: 13,
    color: GREY_TEXT,
    marginBottom: 4,
  },
  smallNote: {
    fontSize: 12,
    color: GREY_TEXT,
    marginTop: 8,
    textAlign: 'center',
  },
  errorText: {
    color: '#B3261E',
    marginBottom: 8,
  },

  // Fremskridt på tjeklisten
  progressBox: {
    backgroundColor: WHITE,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: ACCENT,
  },
  progressBoxDone: {
    borderLeftColor: '#2E8B57',
  },
  progressText: {
    color: NAVY,
    fontWeight: '600',
  },

  // Sejlforhold (vejr)
  statusCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  status_groen: {
    backgroundColor: '#2E8B57',
  },
  status_gul: {
    backgroundColor: '#D9A21B',
  },
  status_roed: {
    backgroundColor: '#B3261E',
  },
  statusTitle: {
    color: WHITE,
    fontSize: 22,
    fontWeight: '700',
  },
  statusText: {
    color: WHITE,
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 12,
    color: GREY_TEXT,
    marginBottom: 8,
  },
  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_BLUE,
  },
  weatherKey: {
    color: GREY_TEXT,
    fontSize: 14,
  },
  weatherValue: {
    color: NAVY,
    fontSize: 14,
    fontWeight: '600',
  },

  // Fake door test
  fakeDoorCard: {
    backgroundColor: WHITE,
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: ACCENT,
  },
  fakeDoorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
  },
  fakeDoorText: {
    fontSize: 14,
    color: GREY_TEXT,
    marginTop: 4,
  },

  // Tjek ind/ud
  sectionHeader: {
    marginTop: 20,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: WHITE,
  },
  chipSelected: {
    backgroundColor: NAVY,
  },
  chipText: {
    color: NAVY,
    fontSize: 16,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: WHITE,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepperButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: LIGHT_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: {
    fontSize: 22,
    color: NAVY,
    fontWeight: '600',
  },
  stepperValue: {
    fontSize: 20,
    fontWeight: '700',
    color: NAVY,
    width: 50,
    textAlign: 'center',
  },
  checkOutButton: {
    marginTop: 14,
    borderColor: WHITE,
  },
});
