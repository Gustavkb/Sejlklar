import { StyleSheet } from 'react-native';

// Maritimt farvetema: navy, hvid, og en varm accentfarve til handling
const NAVY = '#0B3D5C';
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
});
